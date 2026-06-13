export default function ModelLoader({ status, progress, loadStatus, onInit }) {
  // Model ready — show nothing
  if (status === 'ready') return null

  // Model cached — show a quiet progress bar, no big download card
  if (status === 'loading_cached') return (
    <div style={{
      background: 'var(--brand-pale)',
      borderBottom: '1px solid #C5D9C8',
      padding: '10px 1.5rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--brand-soft)',
          animation: 'pulse 1.5s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <div style={{ flex: 1 }}>
          <div className="progress-track" style={{ background: 'rgba(15,35,24,0.12)' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span style={{ fontSize: 12, color: 'var(--brand-soft)', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
          Loading AI model…
        </span>
      </div>
    </div>
  )

  // Actively downloading — full progress card
  if (status === 'downloading') return (
    <div style={{ background: 'var(--brand-pale)', borderBottom: '1px solid #C5D9C8', padding: '12px 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{
          width: 34, height: 34, background: 'var(--brand)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 11, fontWeight: 800, flexShrink: 0,
        }}>AI</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', margin: '0 0 6px' }}>
            Downloading AI model — {progress}%
          </p>
          <div className="progress-track" style={{ background: 'rgba(15,35,24,0.12)' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <p style={{ fontSize: 11, color: 'var(--brand-soft)', margin: 0 }}>
              {loadStatus?.slice(0, 50) ?? 'Preparing…'}
            </p>
            <p style={{ fontSize: 11, color: 'var(--ink-muted)', margin: 0 }}>
              Cached after this — never downloads again
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // First time / error — full download prompt
  return (
    <div style={{ background: 'var(--brand-pale)', borderBottom: '1px solid #C5D9C8', padding: '12px 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{
          width: 34, height: 34, background: status === 'error' ? 'var(--danger)' : 'var(--brand)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 11, fontWeight: 800, flexShrink: 0,
        }}>
          {status === 'error' ? '!' : 'AI'}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', margin: 0 }}>
            {status === 'error' ? 'Download failed — check your connection' : 'AI model not loaded'}
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-secondary)', margin: '2px 0 0' }}>
            {status === 'error'
              ? 'Try again when you have a stable connection.'
              : '~900MB one-time download · runs 100% on your device · works offline after · 📶 recommended on WiFi'}
          </p>
        </div>
        <button onClick={onInit} className="btn btn-primary btn-sm">
          {status === 'error' ? 'Retry' : 'Download AI Model'}
        </button>
      </div>
    </div>
  )
}
