import { useNavigate } from 'react-router-dom'
import { useDocument } from '../context/DocumentContext'
import { DOC_TYPE_LABELS } from '../utils/docClassifier'
import { useSpeech } from '../hooks/useSpeech'
import SummaryCard from '../components/results/SummaryCard'
import KeyInformation from '../components/results/KeyInformation'
import ExplanationCard from '../components/results/ExplanationCard'
import ActionChecklist from '../components/results/ActionChecklist'
import RiskAlerts from '../components/results/RiskAlerts'
import { OriginalDocument } from '../components/results/ConfidenceScore'
import Button from '../components/common/Button'

export default function Results() {
  const navigate = useNavigate()
  const { result, redFlags, docType, image, ocrText, language, reset } = useDocument()
  const { speak, speaking, supported } = useSpeech()

  if (!result) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-body text-[var(--text-secondary)] mb-6">No results to show yet.</p>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    )
  }

  const docTypeLabel = DOC_TYPE_LABELS[docType]
  const audioText = [
    result.what,
    result.summary,
    result.actions?.map(a => `${a.task}${a.deadline ? '. By ' + a.deadline : ''}`).join('. '),
    result.consequence,
  ].filter(Boolean).join('. ')

  function handleReset() {
    reset()
    navigate('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6 pb-16">
      <div className="flex items-center justify-end gap-2">
        {supported && (
          <button
            onClick={() => speak(audioText, language)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
              speaking
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                : 'bg-white border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)]'
            }`}
            title={speaking ? 'Stop reading' : 'Read aloud'}
          >
            {speaking ? '⏹' : '🔊'}
          </button>
        )}
      </div>

      <SummaryCard result={result} redFlags={redFlags} docTypeLabel={docTypeLabel} />
      <KeyInformation result={result} />
      <ExplanationCard result={result} />
      <ActionChecklist actions={result.actions} />
      <RiskAlerts redFlags={redFlags} consequence={result.consequence} />
      <OriginalDocument image={image} ocrText={ocrText} />

      <Button variant="secondary" onClick={handleReset} className="w-full">
        ← Analyze another document
      </Button>
    </div>
  )
}
