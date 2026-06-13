export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)]',
    danger: 'bg-[var(--danger)] text-white hover:bg-red-700',
    accent: 'bg-[var(--accent)] text-white hover:bg-[#7A6548] shadow-sm',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-[17px]',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.33 8h9.34M8.67 4l4 4-4 4" />
        </svg>
      )}
    </button>
  )
}
