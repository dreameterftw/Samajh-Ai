import { useState, useRef, useEffect } from 'react'
import { buildPrompt } from '../utils/prompts'

const MODEL_ID = 'gemma-2-2b-it-q4f32_1-MLC'

export function useLLM() {
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadStatus, setLoadStatus]     = useState(null)
  const [status, setStatus]             = useState('idle')
  const engineRef = useRef(null)

  // On mount — check if model is already cached in browser
  useEffect(() => {
    checkIfCached()
  }, [])

  async function checkIfCached() {
    try {
      const cacheKeys = await caches.keys()
      const hasModel = cacheKeys.some(k =>
        k.toLowerCase().includes('webllm') || k.toLowerCase().includes('mlc')
      )
      if (hasModel) {
        // Model files exist — silently init without showing download UI
        setStatus('loading_cached')
        await initModel(true)
      }
      // else stay 'idle' — show the download button
    } catch {
      // Cache API unavailable — stay idle
    }
  }

  async function initModel(silent = false) {
    if (engineRef.current) return
    if (!silent) setStatus('downloading')
    setLoadProgress(0)

    try {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm')

      const engine = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (report) => {
          setLoadProgress(Math.round(report.progress * 100))
          setLoadStatus(report.text)
        },
      })

      engineRef.current = engine
      setStatus('ready')
    } catch (err) {
      console.error('LLM load error:', err)
      setStatus('error')
    }
  }

  async function explain(extractedText, docType, language) {
    if (!engineRef.current) await initModel()
    setStatus('running')

    try {
      // language is passed through to buildPrompt — never hardcoded
      const prompt = buildPrompt(extractedText, docType, language)

      const reply = await engineRef.current.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 600,
      })

      const raw   = reply.choices[0].message.content
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      setStatus('ready')
      return parsed
    } catch (err) {
      console.error('LLM inference error:', err)
      setStatus('error')
      return null
    }
  }

  return { initModel, explain, status, loadProgress, loadStatus }
}
