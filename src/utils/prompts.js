import { getLang } from '../data/languages'

const BASE_INSTRUCTION = `You are Samajh, a helpful assistant that explains Indian government documents to ordinary citizens in simple, clear language.
The user may have low literacy. Use very short sentences. Avoid jargon.
Always respond in this exact JSON format and nothing else:
{
  "what": "One sentence: what this document is",
  "from_whom": "Who sent this document",
  "summary": "2-3 sentences explaining what this document says in plain language",
  "actions": [
    { "task": "what the person must do", "deadline": "by when or null", "urgency": "high | medium | low" }
  ],
  "amount_due": "amount in rupees or null",
  "deadline": "final deadline as plain text or null",
  "consequence": "what happens if ignored, in one plain sentence or null",
  "safe": true or false
}`

const TYPE_HINTS = {
  electricity_bill: `This is an electricity bill. Focus on: amount due, due date, disconnection warning, meter number.`,
  water_bill:       `This is a water bill. Focus on: amount due, due date, supply cut warning.`,
  legal_notice:     `This is a legal notice. Clearly state: who sent it, what they are claiming, what response is needed, deadline to respond.`,
  court_summons:    `This is a court summons. This is serious. State: which court, case number, date to appear, what happens if ignored.`,
  land_record:      `This is a land or property record. Focus on: whose name it is in, what land/property, any dues or disputes mentioned.`,
  property_tax:     `This is a property tax notice. Focus on: amount, property details, deadline, penalty if late.`,
  bank_letter:      `This is a bank letter. Focus on: account details, what action is required, any charges or deadlines.`,
  govt_scheme:      `This is about a government scheme or benefit. Focus on: what benefit, who is eligible, what the person must do to claim it.`,
  income_tax:       `This is an income tax document. Focus on: what is being asked, any amount due, deadline to respond or file.`,
  general_document: `This is a government document. Explain clearly what it is about and what the person needs to do.`,
}

// Strong, unambiguous language instructions — critical for Gemma to comply
const LANG_INSTRUCTIONS = {
  hindi: `You MUST respond entirely in Hindi using Devanagari script (हिन्दी). Every field in the JSON — what, from_whom, summary, actions, consequence — must be written in Hindi. Do not use English except for proper nouns like organization names and numbers.`,

  english: `You MUST respond entirely in English. Every field in the JSON must be in English.`,

  tamil: `You MUST respond entirely in Tamil script (தமிழ்). Every field in the JSON — what, from_whom, summary, actions, consequence — must be written in Tamil. Do not use English except for proper nouns and numbers.`,

  telugu: `You MUST respond entirely in Telugu script (తెలుగు). Every field in the JSON — what, from_whom, summary, actions, consequence — must be written in Telugu. Do not use English except for proper nouns and numbers.`,
}

export function buildPrompt(extractedText, docType, languageKey) {
  const typeHint = TYPE_HINTS[docType] ?? TYPE_HINTS.general_document
  const langInstruction = LANG_INSTRUCTIONS[languageKey] ?? LANG_INSTRUCTIONS.hindi

  return `${BASE_INSTRUCTION}

${typeHint}

LANGUAGE REQUIREMENT (critical): ${langInstruction}

Document text extracted via OCR:
---
${extractedText.slice(0, 2000)}
---

Respond ONLY with the JSON object. No text before or after it.`
}
