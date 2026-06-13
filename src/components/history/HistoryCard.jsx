import Badge from '../common/Badge'
import { DOC_TYPE_LABELS } from '../../utils/docClassifier'
import { formatDate, getRiskLevel, getRiskLabel } from '../../utils/formatter'

export default function HistoryCard({ doc, onOpen, onDelete }) {
  const risk = getRiskLevel(doc.redFlags, doc.result?.actions)

  return (
    <div className="card p-4 flex items-center gap-4 card-hover">
      <div className="w-14 h-14 rounded-[20px] overflow-hidden bg-gray-100 shrink-0">
        <img src={doc.image} alt="" className="w-full h-full object-cover" />
      </div>

      <button onClick={() => onOpen(doc)} className="flex-1 text-left min-w-0">
        <p className="font-medium text-[var(--text)] truncate">
          {doc.result?.what ?? DOC_TYPE_LABELS[doc.docType]}
        </p>
        <p className="text-caption text-[var(--text-secondary)] mt-0.5">
          {DOC_TYPE_LABELS[doc.docType]} · {formatDate(doc.date)}
        </p>
      </button>

      <Badge variant={risk === 'safe' ? 'safe' : risk === 'urgent' ? 'urgent' : 'warn'}>
        {getRiskLabel(risk)}
      </Badge>

      <button
        onClick={() => onOpen(doc)}
        className="text-sm text-[var(--primary)] font-medium shrink-0"
      >
        View
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onDelete(doc.id) }}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-[var(--text-secondary)] hover:text-[var(--danger)] transition-colors shrink-0"
        title="Delete"
      >
        ✕
      </button>
    </div>
  )
}
