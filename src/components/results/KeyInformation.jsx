import { motion } from 'framer-motion'

export default function KeyInformation({ result }) {
  const items = [
    result?.from_whom && { label: 'Issuer', value: result.from_whom },
    result?.amount_due && { label: 'Amount', value: result.amount_due },
    result?.deadline && { label: 'Due Date', value: result.deadline },
  ].filter(Boolean)

  if (items.length === 0) return null

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.05 }}
          className="card p-5 text-center"
        >
          <p className="text-caption text-[var(--text-secondary)]">{item.label}</p>
          <p className="text-body font-semibold text-[var(--text)] mt-1">{item.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
