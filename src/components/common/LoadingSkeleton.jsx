export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded-full animate-pulse"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  )
}
