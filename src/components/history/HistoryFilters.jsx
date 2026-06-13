const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'safe', label: 'Safe' },
  { id: 'attention', label: 'Attention Needed' },
  { id: 'urgent', label: 'Urgent' },
]

export default function HistoryFilters({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {FILTERS.map(filter => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === filter.id
              ? 'bg-[var(--primary)] text-white'
              : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--primary)]'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
