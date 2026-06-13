import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOCR } from '../hooks/useOCR'
import { useLLM } from '../hooks/useLLM'
import { useHistory } from '../hooks/useHistory'
import { classifyDocument } from '../utils/docClassifier'
import { detectRedFlags } from '../utils/redflags'
import { LANGUAGES, getLang } from '../data/languages'

const DocumentContext = createContext(null)

// Re-export LANGUAGES so existing imports from DocumentContext still work
export { LANGUAGES }

export function DocumentProvider({ children }) {
  const navigate = useNavigate()
  const [languageKey, setLanguageKey] = useState('hindi')
  const [image, setImage] = useState(null)
  const [ocrText, setOcrText] = useState(null)
  const [docType, setDocType] = useState(null)
  const [redFlags, setRedFlags] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [processingStep, setProcessingStep] = useState(0)

  const { history, loading: histLoading, save: saveToHistory, remove: removeFromHistory } = useHistory()
  const { runOCR, progress: ocrProgress, status: ocrStatus } = useOCR()
  const { initModel, explain, status: llmStatus, loadProgress, loadStatus } = useLLM()

  const processDocument = useCallback(async (dataUrl) => {
    setImage(dataUrl)
    setError(null)
    setProcessingStep(0)
    navigate('/app')

    const lang = getLang(languageKey)

    setProcessingStep(1)
    // Pass the tesseract language code from the language config
    const ocr = await runOCR(dataUrl, lang.tesseract)
    if (!ocr || !ocr.text.trim()) {
      setError('Could not read text from this image. Try better lighting or a clearer photo.')
      return
    }

    setProcessingStep(2)
    const type = classifyDocument(ocr.text)
    const flags = detectRedFlags(ocr.text)
    setDocType(type)
    setRedFlags(flags)
    setOcrText(ocr.text)

    setProcessingStep(3)
    const explanation = await explain(ocr.text, type, languageKey)
    if (!explanation) {
      setError('AI explanation failed. Please try again.')
      return
    }

    setProcessingStep(4)
    setResult(explanation)
    await saveToHistory({
      image: dataUrl,
      ocrText: ocr.text,
      result: explanation,
      docType: type,
      redFlags: flags,
      language: languageKey,
    })
  }, [languageKey, runOCR, explain, saveToHistory, navigate])

  const reset = useCallback(() => {
    setImage(null)
    setOcrText(null)
    setDocType(null)
    setRedFlags([])
    setResult(null)
    setError(null)
    setProcessingStep(0)
  }, [])

  const value = {
    language: languageKey,
    setLanguage: setLanguageKey,
    langConfig: getLang(languageKey),  // full config object for TTS etc.
    image,
    ocrText,
    docType,
    redFlags,
    result,
    error,
    setError,
    processingStep,
    history,
    histLoading,
    removeFromHistory,
    processDocument,
    reset,
    initModel,
    llmStatus,
    loadProgress,
    loadStatus,
    ocrProgress,
    ocrStatus,
  }

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocument() {
  const ctx = useContext(DocumentContext)
  if (!ctx) throw new Error('useDocument must be used within DocumentProvider')
  return ctx
}
