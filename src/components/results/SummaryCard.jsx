import { motion } from 'framer-motion'
import Badge from '../common/Badge'
import { getRiskLevel, getRiskLabel } from '../../utils/formatter'

export default function SummaryCard({ result, redFlags, docTypeLabel }) {
  const risk = getRiskLevel(redFlags, result?.actions)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-8 md:p-10"
    >
      <p className="text-caption text-[var(--text-secondary)] uppercase tracking-wide font-medium">
        {docTypeLabel}
      </p>
      <h1 className="text-page-title text-[var(--text)] mt-2 mb-6">
        {result?.what}
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {result?.amount_due && (
          <div className="bg-[var(--background)] rounded-[20px] p-5">
            <p className="text-caption text-[var(--text-secondary)]">Amount Due</p>
            <p className="text-3xl font-bold text-[var(--text)] mt-1">{result.amount_due}</p>
          </div>
        )}
        {result?.deadline && (
          <div className="bg-[var(--background)] rounded-[20px] p-5">
            <p className="text-caption text-[var(--text-secondary)]">Pay Before</p>
            <p className="text-3xl font-bold text-[var(--text)] mt-1">{result.deadline}</p>
          </div>
        )}
        <div className="bg-[var(--background)] rounded-[20px] p-5 flex flex-col justify-center">
          <p className="text-caption text-[var(--text-secondary)]">Risk Level</p>
          <div className="mt-2">
            <Badge variant={risk === 'safe' ? 'safe' : risk === 'urgent' ? 'urgent' : 'warn'}>
              {getRiskLabel(risk)}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
