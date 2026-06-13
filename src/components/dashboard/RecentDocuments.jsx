import { Link } from 'react-router-dom'
import Card from '../common/Card'
import Badge from '../common/Badge'
import { DOC_TYPE_LABELS } from '../../utils/docClassifier'
import { formatShortDate, getRiskLevel, getRiskLabel } from '../../utils/formatter'

export default function RecentDocuments({ history }) {
  const recent = history.slice(0, 3)

  if (recent.length === 0) {
    return (
      <Card>
        <h3 className="font-semibold text-[var(--text)] mb-2">Recent Documents</h3>
        <p className="text-caption text-[var(--text-secondary)]">
          Your analyzed documents will appear here
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--text)]">Recent Documents</h3>
        <Link to="/history" className="text-sm text-[var(--primary)] font-medium">
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {recent.map(doc => {
          const risk = getRiskLevel(doc.redFlags, doc.result?.actions)
          return (
            <Link
              key={doc.id}
              to="/history"
              className="flex items-center gap-4 p-3 rounded-[20px] hover:bg-[var(--background)] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={doc.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--text)] truncate">
                  {doc.result?.what ?? DOC_TYPE_LABELS[doc.docType]}
                </p>
                <p className="text-caption text-[var(--text-secondary)]">
                  {formatShortDate(doc.date)}
                </p>
              </div>
              <Badge variant={risk === 'safe' ? 'safe' : risk === 'urgent' ? 'urgent' : 'warn'}>
                {getRiskLabel(risk)}
              </Badge>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
