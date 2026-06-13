import { useState } from 'react'
import { motion } from 'framer-motion'
import AIChatModal from './AIChatModal'

export default function AIChatButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[var(--primary)] text-white rounded-[20px] shadow-lg font-medium text-sm"
      >
        <span>💬</span>
        Ask Samajh
      </motion.button>

      <AIChatModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
