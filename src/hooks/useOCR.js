import { useRef, useState } from 'react'

let tesseractPromise = null

async function loadTesseract() {
  if (window.Tesseract) return window.Tesseract
  if (tesseractPromise) return tesseractPromise

  tesseractPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
    script.onload = () => resolve(window.Tesseract)
    script.onerror = reject
    document.head.appendChild(script)
  })

  return tesseractPromise
}

export function useOCR() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(null) // 'loading' | 'running' | 'done' | 'error'
  const workerRef = useRef(null)

  /**
   * @param {string} imageDataUrl
   * @param {string} langCode  — tesseract language code e.g. 'hin+eng', 'eng', 'tam+eng'
   *                             Comes from languages.js langConfig.tesseract
   */
  async function runOCR(imageDataUrl, langCode = 'hin+eng') {
    setStatus('loading')
    setProgress(0)

    try {
      const Tesseract = await loadTesseract()

      const worker = await Tesseract.createWorker(langCode, 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
          } else {
            setStatus('loading')
          }
        },
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      })

      workerRef.current = worker
      setStatus('running')

      const result = await worker.recognize(imageDataUrl)
      await worker.terminate()

      setStatus('done')
      setProgress(100)

      return {
        text: result.data.text,
        confidence: result.data.confidence,
        words: result.data.words,
      }
    } catch (err) {
      setStatus('error')
      console.error('OCR error:', err)
      return null
    }
  }

  function reset() {
    setProgress(0)
    setStatus(null)
  }

  return { runOCR, progress, status, reset }
}
