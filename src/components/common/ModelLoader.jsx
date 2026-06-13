export default function ModelLoader({ status, progress, loadStatus, onInit }) {
  const isDownloading = status === 'downloading'
  const isReady = status === 'ready'
  const isError = status === 'error'

  if (isReady) return null

  return (
    <div className="card p-5 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
          AI
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[var(--text)] text-sm">
            {isDownloading ? 'Downloading AI model...' : 'AI model not loaded'}
          </p>

          {!isDownloading && !isError && (
            <>
              <p className="text-caption text-[var(--text-secondary)] mt-1 leading-relaxed">
                Samajh uses a small AI model (~900MB) that runs entirely
                on your device. Download once, works forever offline.
              </p>
              <p className="text-caption text-[var(--warning)] mt-2">
                📶 We recommend doing this on WiFi
              </p>
              <button
                onClick={onInit}
                className="mt-3 px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-[20px]"
              >
                Download AI model
              </button>
            </>
          )}

          {isDownloading && (
            <div className="mt-3 space-y-2">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-caption text-[var(--text-secondary)]">
                {progress}% — {loadStatus ?? 'Preparing...'}
              </p>
            </div>
          )}

          {isError && (
            <div className="mt-2">
              <p className="text-caption text-[var(--danger)]">
                Failed to load model. Check your connection and try again.
              </p>
              <button
                onClick={onInit}
                className="mt-2 px-4 py-2 bg-[var(--danger)] text-white text-sm font-medium rounded-[20px]"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
