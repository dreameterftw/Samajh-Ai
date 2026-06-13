export default function SectionHeading({ title, subtitle, eyebrow, centered = false, className = '' }) {
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-eyebrow mb-3">{eyebrow}</p>
      )}
      <h2 className="text-section-title text-[var(--text)]">{title}</h2>
      {subtitle && (
        <p className="text-body text-[var(--text-secondary)] mt-3 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
