export default function Card({ children, className = '', hover = false, warm = false, ...props }) {
  const warmBg = warm ? 'bg-[var(--surface-warm)]' : ''
  return (
    <div
      className={`card p-6 ${hover ? 'card-hover' : ''} ${warmBg} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
