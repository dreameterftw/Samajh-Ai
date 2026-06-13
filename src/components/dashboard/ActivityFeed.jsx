import Card from '../common/Card'
import { DOC_TYPE_LABELS } from '../../utils/docClassifier'
import { formatShortDate } from '../../utils/formatter'

export default function ActivityFeed({ history }) {
  const activities = history.slice(0, 5).map(doc => ({
    id: doc.id,
    text: `Analyzed ${doc.result?.what ?? DOC_TYPE_LABELS[doc.docType]}`,
    date: formatShortDate(doc.date),
    icon: '📋',
  }))

  return (
    <Card>
      <h3 className="font-semibold text-[var(--text)] mb-4">Activity</h3>
      {activities.length === 0 ? (
        <p className="text-caption text-[var(--text-secondary)]">
          No activity yet. Upload your first document to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map(item => (
            <div key={item.id} className="flex items-start gap-3">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm text-[var(--text)]">{item.text}</p>
                <p className="text-caption text-[var(--text-secondary)]">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
