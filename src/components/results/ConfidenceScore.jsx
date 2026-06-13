import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConfidenceScore({ confidence }) {
  if (!confidence) return null

  const pct = Math.round(confidence)
  const level = pct >= 80 ? 'High' : pct >= 50 ? 'Medium' : 'Low'
  const color = pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: color }}
      >
        {pct}%
      </div>
      <div>
        <p className="text-caption text-[var(--text-secondary)]">Reading Confidence</p>
        <p className="font-medium text-[var(--text)]">{level}</p>
      </div>
    </div>
  )
}

export function OriginalDocument({ image, ocrText }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-[var(--background)] transition-colors"
      >
        <span className="font-semibold text-[var(--text)]">Original Document</span>
        <span className="text-[var(--text-secondary)]">{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--border)]"
          >
            {image && (
              <img src={image} alt="Original document" className="w-full max-h-96 object-contain bg-gray-50" />
            )}
            {ocrText && (
              <pre className="p-4 text-caption text-[var(--text-secondary)] whitespace-pre-wrap max-h-48 overflow-auto">
                {ocrText}
              </pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
