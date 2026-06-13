import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOCR } from '../hooks/useOCR'
import { useLLM } from '../hooks/useLLM'
import { useHistory } from '../hooks/useHistory'
import { classifyDocument } from '../utils/docClassifier'
import { detectRedFlags } from '../utils/redflags'

const DocumentContext = createContext(null)

export const LANGUAGES = [
  { id: 'hindi', label: 'हिं', name: 'Hindi' },
  { id: 'english', label: 'EN', name: 'English' },
  { id: 'tamil', label: 'த', name: 'Tamil' },
  { id: 'telugu', label: 'తె', name: 'Telugu' },
]

export function DocumentProvider({ children }) {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('hindi')
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
    navigate('/processing')

    setProcessingStep(1)
    const ocr = await runOCR(dataUrl, language)
    if (!ocr || !ocr.text.trim()) {
      setError('Could not read text from this image. Try better lighting or a clearer photo.')
      navigate('/upload')
      return
    }

    setProcessingStep(2)
    const type = classifyDocument(ocr.text)
    const flags = detectRedFlags(ocr.text)
    setDocType(type)
    setRedFlags(flags)
    setOcrText(ocr.text)

    setProcessingStep(3)
    const explanation = await explain(ocr.text, type, language)
    if (!explanation) {
      setError('AI explanation failed. Please try again.')
      navigate('/upload')
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
      language,
    })
    navigate('/results')
  }, [language, runOCR, explain, saveToHistory, navigate])

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
    language,
    setLanguage,
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
