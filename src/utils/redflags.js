const RED_FLAG_RULES = [
  {
    id: 'private_mobile',
    check: (text) => /call.{0,30}[6-9]\d{9}|contact.{0,30}[6-9]\d{9}/i.test(text),
    message: 'Asks you to call a private mobile number — official notices use landlines or official helplines only.',
    severity: 'high',
  },
  {
    id: 'urgent_24hr',
    check: (text) => /within 24 hours|24 घंटे|तुरंत भुगतान|immediate payment|pay immediately/i.test(text),
    message: 'Demands payment within 24 hours — genuine government notices give at least 15–30 days.',
    severity: 'high',
  },
  {
    id: 'upi_payment',
    check: (text) => /pay.{0,20}UPI|Google Pay|PhonePe|Paytm.{0,30}fine|penalty/i.test(text),
    message: 'Asks for fine or penalty via UPI/Paytm — government dues are paid at official counters or portals.',
    severity: 'high',
  },
  {
    id: 'no_letterhead',
    check: (text) => text.length > 100 && !/government|सरकार|dept|department|ministry|municipal|nagar|district/i.test(text),
    message: 'No official department name found — authentic notices always state the issuing authority.',
    severity: 'medium',
  },
  {
    id: 'whatsapp_contact',
    check: (text) => /whatsapp|telegram|signal.{0,20}contact/i.test(text),
    message: 'Asks you to contact via WhatsApp or Telegram — government offices do not communicate this way officially.',
    severity: 'high',
  },
  {
    id: 'vague_threat',
    check: (text) => /arrest|jail|FIR|police action.{0,30}(immediately|24|today)/i.test(text),
    message: 'Threatens immediate arrest or FIR — real legal action always follows a formal process with prior notice.',
    severity: 'high',
  },
]

export function detectRedFlags(text) {
  return RED_FLAG_RULES
    .filter(rule => rule.check(text))
    .map(({ id, message, severity }) => ({ id, message, severity }))
}
