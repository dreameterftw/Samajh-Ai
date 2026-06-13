import { useRef, useState } from 'react'
import { preprocessImage } from '../../utils/imagePreprocess'
import { SUPPORTED_FORMATS } from '../../data/supportedDocs'

async function renderPDFPage(url) {
  if (!window.pdfjsLib) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  }
  const pdf = await window.pdfjsLib.getDocument(url).promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 2 })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
  return canvas.toDataURL('image/png')
}

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = res
    s.onerror = rej
    document.head.appendChild(s)
  })
}

export default function FileUploader({ onFileSelect }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  async function handleFile(file) {
    if (!file) return
    if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      const processed = await renderPDFPage(url)
      onFileSelect(processed, file.name)
    } else {
      const processed = await preprocessImage(file)
      onFileSelect(processed, file.name)
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`upload-zone ${dragging ? 'drag-over' : ''}`}
      style={{ padding: '3.5rem 2rem', textAlign: 'center' }}
    >
      {/* Icon */}
      <div style={{
        width: 56, height: 56,
        background: dragging ? 'var(--brand-pale)' : 'var(--bg)',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
        transition: 'background 0.2s',
        border: '1px solid var(--border-soft)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dragging ? 'var(--brand)' : 'var(--ink-muted)'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <p style={{ fontSize: 15, fontWeight: 600, color: dragging ? 'var(--brand)' : 'var(--ink)', marginBottom: 6 }}>
        {dragging ? 'Drop to upload' : 'Drag document here'}
      </p>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 4 }}>or</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand-soft)' }}>Browse Files</p>

      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
        {SUPPORTED_FORMATS.map(fmt => (
          <span key={fmt} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
            background: 'var(--brand-xpale)', color: 'var(--brand-soft)',
            border: '1px solid var(--brand-pale)',
            padding: '2px 8px', borderRadius: 9999,
          }}>
            {fmt}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </div>
  )
}
