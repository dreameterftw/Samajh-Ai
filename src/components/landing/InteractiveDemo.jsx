import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'
import Card from '../common/Card'

const DEMO_RESULT = {
  what: 'Electricity Bill Payment Notice',
  summary: 'Your electricity bill for May 2026 shows a total amount due of ₹1,240. Payment must be made before 15 June to avoid a late fee penalty of ₹100.',
  amount_due: '₹1,240',
  deadline: '15 June 2026',
  actions: [
    { task: 'Pay bill online or at nearest payment center', urgency: 'high', deadline: '15 June' },
    { task: 'Save payment receipt for records', urgency: 'low' },
    { task: 'Verify meter reading matches bill', urgency: 'medium' },
  ],
}

const STEPS = ['Scanning document...', 'Extracting structured data...', 'Simplifying legal terms...', 'Done']

export default function InteractiveDemo() {
  const [phase, setPhase] = useState('idle')
  const [stepIndex, setStepIndex] = useState(0)

  function startDemo() {
    setPhase('processing')
    setStepIndex(0)

    const timers = [
      setTimeout(() => setStepIndex(1), 1000),
      setTimeout(() => setStepIndex(2), 2000),
      setTimeout(() => setStepIndex(3), 3000),
      setTimeout(() => setPhase('done'), 4000),
    ]

    return () => timers.forEach(clearTimeout)
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Interactive Demo"
          title="Try it yourself"
          subtitle="See how Samajh AI translates an official utility bill warning into clear, actionable bullet points"
          centered
        />

        <Card className="min-h-[380px] flex flex-col items-center justify-center bg-[var(--surface-warm)]/40 border border-[var(--border)] p-8 md:p-12 shadow-sm rounded-2xl relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center"
              >
                {/* SVG Document Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-light)] text-[var(--accent)] flex items-center justify-center mb-6 shadow-inner">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <p className="text-body text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
                  Upload the sample notice below to see the offline translation in action.
                </p>
                <Button size="lg" arrow onClick={startDemo}>
                  Upload Sample Notice
                </Button>
              </motion.div>
            )}

            {phase === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm space-y-6"
              >
                {/* Glowing Spinner */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--border)]" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-[var(--accent)] animate-spin" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 ${
                        i <= stepIndex ? 'text-[var(--text)] opacity-100' : 'text-[var(--text-secondary)] opacity-35'
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border text-xs">
                        {i < stepIndex ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : i === stepIndex ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                        ) : (
                          <span>○</span>
                        )}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-6 text-left"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <h3 className="font-serif text-xl font-bold text-[var(--text)]">
                    {DEMO_RESULT.what}
                  </h3>
                  <span className="status-safe px-3 py-1 rounded-full text-xs font-semibold">
                    Risk: Low
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm">
                    <p className="text-eyebrow mb-1">Amount Due</p>
                    <p className="text-2xl font-serif font-bold text-[var(--primary)]">
                      {DEMO_RESULT.amount_due}
                    </p>
                  </div>
                  <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm">
                    <p className="text-eyebrow mb-1">Due Date</p>
                    <p className="text-2xl font-serif font-bold text-[var(--primary)]">
                      {DEMO_RESULT.deadline}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="font-serif font-bold text-sm uppercase tracking-wide text-[var(--accent)]">
                    Summary Explanation
                  </h4>
                  <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {DEMO_RESULT.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setPhase('idle')}>
                    Try another sample
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  )
}
