export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-[var(--text-secondary)]',
    safe: 'status-safe',
    warn: 'status-warn',
    urgent: 'status-urgent',
    primary: 'bg-[var(--primary-light)] text-[var(--primary)]',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
