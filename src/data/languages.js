export const LANGUAGES = [
  {
    key: 'hindi',
    label: 'हिं',
    full: 'Hindi',
    tesseract: 'hin+eng',
    ttsLang: 'hi-IN',
    ttsVoiceName: 'Google हिन्दी',
    promptLang: 'Respond in Hindi (Devanagari script).',
  },
  {
    key: 'english',
    label: 'EN',
    full: 'English',
    tesseract: 'eng',
    ttsLang: 'en-IN',
    ttsVoiceName: 'Google UK English Female',
    promptLang: 'Respond in English.',
  },
  {
    key: 'tamil',
    label: 'த',
    full: 'Tamil',
    tesseract: 'tam+eng',
    ttsLang: 'ta-IN',
    ttsVoiceName: 'Google தமிழ்',
    promptLang: 'Respond in Tamil script.',
  },
  {
    key: 'telugu',
    label: 'తె',
    full: 'Telugu',
    tesseract: 'tel+eng',
    ttsLang: 'te-IN',
    ttsVoiceName: 'Google తెలుగు',
    promptLang: 'Respond in Telugu script.',
  },
]

export function getLang(key) {
  return LANGUAGES.find(l => l.key === key) ?? LANGUAGES[0]
}
