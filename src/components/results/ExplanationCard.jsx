import { motion } from 'framer-motion'
import { GLOSSARY } from '../../data/glossary'

function AnnotatedText({ text }) {
  if (!text) return null
  const terms = Object.keys(GLOSSARY)
  const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi')
  const parts = text.split(pattern)

  return (
    <span>
      {parts.map((part, i) => {
        const def = GLOSSARY[part.toLowerCase()]
        if (def) {
          return (
            <span key={i} className="underline decoration-[var(--primary)] decoration-2 underline-offset-2 cursor-help" title={def}>
              {part}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

export default function ExplanationCard({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card p-6"
    >
      <h2 className="font-semibold text-[var(--text)] mb-3">What This Means</h2>
      <p className="text-body text-[var(--text-secondary)] leading-relaxed">
        <AnnotatedText text={result?.summary} />
      </p>
      {result?.from_whom && (
        <p className="text-caption text-[var(--text-secondary)] mt-4 pt-4 border-t border-[var(--border)]">
          Issued by: <span className="font-medium text-[var(--text)]">{result.from_whom}</span>
        </p>
      )}
    </motion.div>
  )
}
