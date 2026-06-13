import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocument } from '../context/DocumentContext'
import { DOC_TYPE_LABELS } from '../utils/docClassifier'
import { getRiskLevel } from '../utils/formatter'
import SearchBar from '../components/history/SearchBar'
import HistoryFilters from '../components/history/HistoryFilters'
import HistoryCard from '../components/history/HistoryCard'
import EmptyState from '../components/common/EmptyState'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import Button from '../components/common/Button'
import SummaryCard from '../components/results/SummaryCard'
import ExplanationCard from '../components/results/ExplanationCard'
import ActionChecklist from '../components/results/ActionChecklist'
import RiskAlerts from '../components/results/RiskAlerts'
import { OriginalDocument } from '../components/results/ConfidenceScore'

export default function History() {
  const navigate = useNavigate()
  const { history, histLoading, removeFromHistory } = useDocument()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [viewing, setViewing] = useState(null)

  const filtered = useMemo(() => {
    return history.filter(doc => {
      const title = doc.result?.what ?? DOC_TYPE_LABELS[doc.docType] ?? ''
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase())
      const risk = getRiskLevel(doc.redFlags, doc.result?.actions)
      const matchesFilter = filter === 'all' || risk === filter
      return matchesSearch && matchesFilter
    })
  }, [history, search, filter])

  if (viewing) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <button
          onClick={() => setViewing(null)}
          className="text-sm text-[var(--primary)] font-medium"
        >
          ← Back to history
        </button>
        <SummaryCard
          result={viewing.result}
          redFlags={viewing.redFlags}
          docTypeLabel={DOC_TYPE_LABELS[viewing.docType]}
        />
        <ExplanationCard result={viewing.result} />
        <ActionChecklist actions={viewing.result?.actions} />
        <RiskAlerts redFlags={viewing.redFlags} consequence={viewing.result?.consequence} />
        <OriginalDocument image={viewing.image} ocrText={viewing.ocrText} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-page-title text-[var(--text)] mb-6">History</h1>

      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <HistoryFilters active={filter} onChange={setFilter} />
      </div>

      {histLoading ? (
        <LoadingSkeleton lines={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🗂️"
          title="No documents yet"
          description="Your analyzed documents will appear here"
          action={<Button onClick={() => navigate('/upload')}>Upload a document</Button>}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map(doc => (
            <HistoryCard
              key={doc.id}
              doc={doc}
              onOpen={setViewing}
              onDelete={removeFromHistory}
            />
          ))}
        </div>
      )}
    </div>
  )
}
