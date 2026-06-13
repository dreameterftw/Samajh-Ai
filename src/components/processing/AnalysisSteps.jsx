import { motion } from 'framer-motion'

const STEPS = [
  { id: 1, label: 'Reading document' },
  { id: 2, label: 'Extracting text' },
  { id: 3, label: 'Understanding meaning' },
  { id: 4, label: 'Generating explanation' },
]

export default function AnalysisSteps({ currentStep }) {
  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      {STEPS.map(step => {
        const done = currentStep > step.id
        const active = currentStep === step.id
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.id * 0.1 }}
            className={`flex items-center gap-3 text-body ${
              done ? 'text-[var(--success)]' : active ? 'text-[var(--text)]' : 'text-[var(--text-secondary)] opacity-50'
            }`}
          >
            <span className="w-6 text-center">
              {done ? '✓' : active ? '⏳' : '○'}
            </span>
            <span className={active ? 'font-medium' : ''}>{step.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
