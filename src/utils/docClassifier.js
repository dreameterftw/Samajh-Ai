const PATTERNS = {
  electricity_bill: [
    /electricity|vidyut|bijli|BESCOM|MSEB|KSEB|BSES|TPDDL|units consumed/i,
  ],
  water_bill: [
    /water supply|jal board|water charges|water tax/i,
  ],
  legal_notice: [
    /legal notice|advocate|court|plaintiff|defendant|hereby|vakalatnama/i,
  ],
  court_summons: [
    /summons|appear before|district court|high court|magistrate|case no/i,
  ],
  land_record: [
    /khasra|khatauni|patta|mutation|survey number|land record|tehsil|patwari/i,
  ],
  property_tax: [
    /property tax|house tax|municipal|nagar palika|ward no/i,
  ],
  bank_letter: [
    /bank|account number|IFSC|loan|EMI|overdraft|passbook|cheque/i,
  ],
  govt_scheme: [
    /yojana|scheme|beneficiary|subsidy|PM |pradhan mantri|ration card/i,
  ],
  income_tax: [
    /income tax|ITR|PAN|assessment year|TDS|Form 16/i,
  ],
}

export function classifyDocument(text) {
  const scores = {}

  for (const [type, patterns] of Object.entries(PATTERNS)) {
    scores[type] = patterns.filter(p => p.test(text)).length
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]

  // If nothing matched confidently, return generic
  if (best[1] === 0) return 'general_document'
  return best[0]
}

export const DOC_TYPE_LABELS = {
  electricity_bill: 'Electricity Bill',
  water_bill: 'Water Bill',
  legal_notice: 'Legal Notice',
  court_summons: 'Court Summons ⚠️',
  land_record: 'Land Record',
  property_tax: 'Property Tax Notice',
  bank_letter: 'Bank Letter',
  govt_scheme: 'Government Scheme',
  income_tax: 'Income Tax Document',
  general_document: 'Government Document',
}
