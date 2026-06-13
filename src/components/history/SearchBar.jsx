export default function SearchBar({ value, onChange, placeholder = 'Search documents...' }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-[20px] border border-[var(--border)] bg-white text-body text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] transition-all"
      />
    </div>
  )
}
