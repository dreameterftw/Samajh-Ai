import { motion, AnimatePresence } from 'framer-motion'
import SuggestedQuestions from './SuggestedQuestions'
import { useDocument } from '../../context/DocumentContext'

export default function AIChatModal({ open, onClose }) {
  const { result } = useDocument()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-0 md:bottom-8 md:right-8 md:left-auto left-0 right-0 md:w-96 z-50 card rounded-b-none md:rounded-[20px] p-6 max-h-[70vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--text)]">Ask Samajh</h3>
              <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text)]">✕</button>
            </div>

            <p className="text-caption text-[var(--text-secondary)] mb-4">
              {result
                ? 'Ask questions about your analyzed document'
                : 'Analyze a document first to ask specific questions'}
            </p>

            <SuggestedQuestions result={result} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
