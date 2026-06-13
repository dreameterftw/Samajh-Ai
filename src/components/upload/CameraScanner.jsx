import { useRef, useState, useEffect } from 'react'
import { preprocessImage } from '../../utils/imagePreprocess'

export default function CameraScanner({ onCapture, onCancel }) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [capturing, setCapturing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    startCamera()
    return () => stopCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 },
      })
      if (videoRef.current) videoRef.current.srcObject = s
      setStream(s)
    } catch {
      setError('Camera access denied. Please allow camera access or use file upload instead.')
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach(t => t.stop())
  }

  async function capture() {
    setCapturing(true)
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const raw = canvas.toDataURL('image/png')
    const processed = await preprocessImage(raw)
    stopCamera()
    onCapture(processed)
    setCapturing(false)
  }

  if (error) {
    return (
      <div className="card-lg" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, background: 'var(--danger-bg)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <line x1="12" y1="11" x2="12" y2="15" /><circle cx="12" cy="18" r="0.5" fill="currentColor" />
          </svg>
        </div>
        <p style={{ fontSize: 14, color: 'var(--danger)', marginBottom: '1.25rem', lineHeight: 1.6 }}>{error}</p>
        <button onClick={onCancel} className="btn btn-secondary btn-sm">← Back to upload</button>
      </div>
    )
  }

  return (
    <div style={{ borderRadius: 'var(--r-2xl)', overflow: 'hidden', background: '#000', aspectRatio: '4/3', maxHeight: '65vh', position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Overlay frame guide */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{
          width: '72%', height: '75%',
          border: '2px solid rgba(255,255,255,0.7)',
          borderRadius: 12,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)',
        }} />
      </div>

      {/* Instruction */}
      <div style={{ position: 'absolute', top: '1rem', left: 0, right: 0, textAlign: 'center' }}>
        <span style={{
          display: 'inline-block', background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.9)',
          fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 99,
          backdropFilter: 'blur(8px)',
        }}>
          Align document within the frame
        </span>
      </div>

      {/* Bottom controls */}
      <div style={{ position: 'absolute', bottom: '1.25rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px', borderRadius: 99,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)', color: 'white',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={capture}
          disabled={capturing}
          style={{
            padding: '10px 24px', borderRadius: 99,
            background: capturing ? 'rgba(255,255,255,0.5)' : 'white',
            color: capturing ? 'rgba(0,0,0,0.5)' : 'var(--brand)',
            fontSize: 13, fontWeight: 700, cursor: capturing ? 'not-allowed' : 'pointer',
            border: 'none', transition: 'all 0.15s',
          }}
        >
          {capturing ? 'Processing…' : '📸 Capture'}
        </button>
      </div>
    </div>
  )
}
