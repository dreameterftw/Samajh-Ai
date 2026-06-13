import { useState } from 'react'

const DEFAULT_QUESTIONS = [
  'What does this mean?',
  'Can I ignore this?',
  'What happens next?',
  'Is this urgent?',
]

export default function SuggestedQuestions({ result }) {
  const [selected, setSelected] = useState(null)

  const questions = result
    ? [
        'What does this mean?',
        'Can I ignore this?',
        'What happens if I miss the deadline?',
        result.amount_due ? `Why is the amount ${result.amount_due}?` : 'What should I do first?',
      ]
    : DEFAULT_QUESTIONS

  function handleClick(q) {
    setSelected(q)
  }

  return (
    <div className="space-y-3">
      {questions.map(q => (
        <button
          key={q}
          onClick={() => handleClick(q)}
          className={`w-full text-left p-4 rounded-[20px] border transition-colors ${
            selected === q
              ? 'border-[var(--primary)] bg-[var(--primary-light)]'
              : 'border-[var(--border)] hover:border-[var(--primary)]'
          }`}
        >
          <p className="text-sm text-[var(--text)]">{q}</p>
        </button>
      ))}

      {selected && result && (
        <div className="p-4 bg-[var(--background)] rounded-[20px] mt-2">
          <p className="text-body text-[var(--text-secondary)]">
            {getAnswer(selected, result)}
          </p>
        </div>
      )}

      {selected && !result && (
        <p className="text-caption text-[var(--text-secondary)] text-center py-2">
          Upload a document to get personalized answers
        </p>
      )}
    </div>
  )
}

function getAnswer(question, result) {
  if (question.includes('ignore')) {
    return result.consequence
      ? `This document requires attention. If ignored: ${result.consequence}`
      : 'Review the action checklist. Some items may need your attention.'
  }
  if (question.includes('deadline')) {
    return result.deadline
      ? `The deadline is ${result.deadline}. Make sure to complete required actions before this date.`
      : 'No specific deadline was found in this document.'
  }
  if (question.includes('amount')) {
    return result.summary ?? 'The amount details are in the document summary above.'
  }
  if (question.includes('do first')) {
    return result.actions?.[0]?.task ?? 'Review the action checklist for recommended steps.'
  }
  return result.summary ?? 'See the explanation above for a plain-language summary.'
}
