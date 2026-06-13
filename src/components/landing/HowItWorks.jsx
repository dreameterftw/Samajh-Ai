import { motion } from 'framer-motion'
import SectionHeading from '../common/SectionHeading'

const STEPS = [
  { num: '01', title: 'Upload', description: 'Take a photo or drag & drop a PDF document.' },
  { num: '02', title: 'Analyze', description: 'Our local AI scans and classifies the document contents.' },
  { num: '03', title: 'Understand', description: 'Read a simplified, plain-language translation of key terms.' },
  { num: '04', title: 'Take Action', description: 'Follow custom generated checklists and set reminder dates.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-[var(--surface)] border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Workflow"
          title="Four simple steps to clarity"
          subtitle="How Samajh AI processes official paperwork locally on your device"
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-16">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1.5px] bg-[var(--border)] z-0" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center relative z-10 group"
            >
              {/* Step circle */}
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--surface-warm)] border-2 border-[var(--border)] flex items-center justify-center font-serif text-xl font-bold text-[var(--accent)] mb-6 shadow-sm group-hover:border-[var(--accent)] group-hover:bg-[var(--primary-light)] transition-all duration-300">
                {step.num}
              </div>
              
              <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-3">{step.title}</h3>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] px-4">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
