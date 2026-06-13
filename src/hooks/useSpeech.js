import { useState, useCallback } from 'react'

const LANG_CODES = {
  hindi: 'hi-IN',
  english: 'en-IN',
  tamil: 'ta-IN',
  telugu: 'te-IN',
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const speak = useCallback((text, language = 'hindi') => {
    if (!supported) return

    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = LANG_CODES[language] ?? 'hi-IN'
    utterance.rate = 0.85
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }, [speaking, supported])

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }, [supported])

  return { speak, stop, speaking, supported }
}
