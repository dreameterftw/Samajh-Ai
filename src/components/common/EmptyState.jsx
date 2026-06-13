export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-section-title text-[var(--text)] mb-2">{title}</h3>
      <p className="text-body text-[var(--text-secondary)] max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
