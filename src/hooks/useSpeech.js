import { useState, useRef } from 'react'

function getBestVoice(ttsLang, preferredName) {
  const voices = window.speechSynthesis.getVoices()
  const langPrefix = ttsLang.split('-')[0]

  // 1. Exact preferred voice name (Google voices are best quality)
  const exact = voices.find(v => v.name === preferredName)
  if (exact) return exact

  // 2. Any female-sounding Google voice for this language
  const googleFemale = voices.find(v =>
    v.lang.startsWith(langPrefix) &&
    v.name.toLowerCase().includes('google') &&
    !v.name.toLowerCase().includes('male')
  )
  if (googleFemale) return googleFemale

  // 3. Any Google voice for this language
  const google = voices.find(v =>
    v.lang.startsWith(langPrefix) &&
    v.name.toLowerCase().includes('google')
  )
  if (google) return google

  // 4. Fallback — any voice matching the language
  const fallback = voices.find(v => v.lang.startsWith(langPrefix))
  return fallback ?? null
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef(null)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  function speak(text, langConfig) {
    if (!supported) return

    // Stop if already speaking
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)

    // Set language
    utterance.lang = langConfig.ttsLang

    // Natural, less robotic settings
    utterance.rate = 0.88    // slightly slower = clearer
    utterance.pitch = 1.1    // slightly higher = more natural female
    utterance.volume = 1.0

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    // Chrome bug fix — voices sometimes not loaded yet on first call
    window.speechSynthesis.cancel()
    setTimeout(() => {
      // Find best available voice after cancel clears state
      const voice = getBestVoice(langConfig.ttsLang, langConfig.ttsVoiceName)
      if (voice) utterance.voice = voice
      window.speechSynthesis.speak(utterance)
    }, 100)

    utteranceRef.current = utterance
  }

  function stop() {
    if (supported) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }

  return { speak, stop, speaking, supported }
}
