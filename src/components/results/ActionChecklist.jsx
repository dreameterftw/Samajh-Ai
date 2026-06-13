import { useState } from 'react'
import { motion } from 'framer-motion'

const urgencyIcon = { high: '🔴', medium: '🟡', low: '🟢' }

export default function ActionChecklist({ actions }) {
  const [checked, setChecked] = useState({})

  if (!actions?.length) return null

  function toggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card p-6"
    >
      <h2 className="font-semibold text-[var(--text)] mb-4">Action Checklist</h2>
      <div className="space-y-3">
        {actions.map((action, i) => (
          <label
            key={i}
            className="flex items-start gap-3 p-3 rounded-[20px] hover:bg-[var(--background)] cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => toggle(i)}
              className="mt-1 w-5 h-5 rounded accent-[var(--primary)]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{urgencyIcon[action.urgency] ?? '🟢'}</span>
                <p className={`text-body ${checked[i] ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text)]'}`}>
                  {action.task}
                </p>
              </div>
              {action.deadline && (
                <p className="text-caption text-[var(--text-secondary)] mt-1 ml-7">
                  By {action.deadline}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </motion.div>
  )
}
