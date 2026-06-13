export default function ProgressTracker({ progress }) {
  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-caption text-[var(--text-secondary)] mt-2 text-center">{progress}%</p>
    </div>
  )
}
