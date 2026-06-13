import Card from '../common/Card'

export default function StatsCards({ history }) {
  const totalDocs = history.length
  const deadlines = history.filter(d => d.result?.deadline).length
  const issues = history.filter(d => d.redFlags?.length > 0).length

  const stats = [
    { label: 'Documents Analyzed', value: totalDocs, icon: '📄' },
    { label: 'Deadlines Tracked', value: deadlines, icon: '📅' },
    { label: 'Issues Detected', value: issues, icon: '⚠️' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(stat => (
        <Card key={stat.label} className="text-center !p-4">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <p className="text-2xl font-bold text-[var(--text)]">{stat.value}</p>
          <p className="text-caption text-[var(--text-secondary)] mt-1">{stat.label}</p>
        </Card>
      ))}
    </div>
  )
}
