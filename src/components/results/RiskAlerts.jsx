import { motion } from 'framer-motion'

export default function RiskAlerts({ redFlags, consequence }) {
  if (!redFlags?.length && !consequence) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="space-y-4"
    >
      {redFlags?.length > 0 && (
        <div className="card p-6 border-l-4 border-l-[var(--danger)]">
          <h2 className="font-semibold text-[var(--danger)] mb-3">Potential Issues</h2>
          <ul className="space-y-2">
            {redFlags.map(flag => (
              <li key={flag.id} className="text-body text-[var(--text)]">
                ⚠️ {flag.message ?? flag.id}
              </li>
            ))}
          </ul>
        </div>
      )}

      {consequence && (
        <div className="card p-6 border-l-4 border-l-[var(--warning)]">
          <h2 className="font-semibold text-[var(--warning)] mb-2">If Ignored</h2>
          <p className="text-body text-[var(--text-secondary)]">{consequence}</p>
        </div>
      )}
    </motion.div>
  )
}
