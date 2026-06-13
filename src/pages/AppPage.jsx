import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDocument } from '../context/DocumentContext'
import { LANGUAGES } from '../data/languages'
import { DOC_TYPE_LABELS } from '../utils/docClassifier'
import { getRiskLevel, getRiskLabel, formatDate } from '../utils/formatter'
import { GLOSSARY } from '../data/glossary'
import { useSpeech } from '../hooks/useSpeech'
import FileUploader from '../components/upload/FileUploader'
import CameraScanner from '../components/upload/CameraScanner'

/* ════════════════════════════════════════
   SHARED ICON HELPERS
════════════════════════════════════════ */
function ShieldIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 8 6 11 13 4" />
    </svg>
  )
}

/* ════════════════════════════════════════
   TOP NAVBAR (shared across the app page)
════════════════════════════════════════ */
function AppNavbar({ language, setLanguage, onAIClick, historyCount, onViewDoc }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(248,246,241,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-soft)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 1.5rem', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div className="logo-mark"><ShieldIcon size={16} /></div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--brand)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>Samajh AI</div>
            <div style={{ fontSize: 10, color: 'var(--ink-muted)', lineHeight: 1.2, fontWeight: 500 }}>Understand. Act. Stress less.</div>
          </div>
        </Link>

        {/* Center — language picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.key}
              onClick={() => setLanguage(lang.key)}
              title={lang.full}
              style={{
                padding: '4px 10px', borderRadius: 9999,
                fontSize: 12, fontWeight: 600,
                border: language === lang.key ? '1.5px solid var(--brand-soft)' : '1.5px solid transparent',
                background: language === lang.key ? 'var(--brand-pale)' : 'transparent',
                color: language === lang.key ? 'var(--brand)' : 'var(--ink-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {lang.label} {lang.full}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {historyCount > 0 && (
            <HistoryDropdown onViewDoc={onViewDoc} />
          )}
          <button
            onClick={onAIClick}
            className="btn btn-secondary btn-sm"
            style={{ gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Ask AI
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ════════════════════════════════════════
   HISTORY DROPDOWN
════════════════════════════════════════ */
function HistoryDropdown({ onViewDoc }) {
  const [open, setOpen] = useState(false)
  const { history, removeFromHistory } = useDocument()

  function handleClick(doc) {
    setOpen(false)
    onViewDoc(doc)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-ghost btn-sm"
        style={{ gap: 6 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        </svg>
        History
        {history.length > 0 && (
          <span style={{ background: 'var(--brand)', color: 'white', borderRadius: 99, fontSize: 10, padding: '1px 5px', fontWeight: 700 }}>
            {history.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
          <div className="card-lg" style={{ position: 'absolute', top: '110%', right: 0, width: 290, zIndex: 100, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Recent Scans</span>
            </div>
            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {history.length === 0 ? (
                <p style={{ padding: '1rem', fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center' }}>No documents yet</p>
              ) : (
                history.slice(0, 8).map(doc => {
                  const label = DOC_TYPE_LABELS[doc.docType] ?? 'Document'
                  const risk = getRiskLevel(doc.redFlags, doc.result?.actions)
                  return (
                    <button
                      key={doc.id}
                      onClick={() => handleClick(doc)}
                      style={{
                        width: '100%', padding: '10px 14px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        borderBottom: '1px solid var(--border-soft)',
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: 32, height: 32, background: 'var(--brand-pale)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                        {doc.docType === 'electricity_bill' ? '⚡' : doc.docType === 'legal_notice' ? '⚖️' : doc.docType === 'court_summons' ? '🏛️' : '📄'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{formatDate(doc.date)}</div>
                      </div>
                      <div className={`badge badge-${risk === 'urgent' ? 'danger' : risk === 'attention' ? 'warn' : 'safe'}`} style={{ fontSize: 10, flexShrink: 0 }}>
                        {getRiskLabel(risk)}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ════════════════════════════════════════
   MODEL LOADER BANNER
════════════════════════════════════════ */
function ModelBanner({ status, progress, loadStatus, onInit }) {
  if (status === 'ready') return null
  const isDownloading = status === 'downloading'

  return (
    <div style={{ background: 'var(--brand-pale)', borderBottom: '1px solid #C5D9C8', padding: '12px 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{
          width: 34, height: 34, background: 'var(--brand)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 11, fontWeight: 800, flexShrink: 0,
        }}>AI</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', margin: 0 }}>
            {isDownloading ? `Downloading AI model — ${progress}%` : 'AI model not loaded'}
          </p>
          {isDownloading ? (
            <div style={{ marginTop: 6 }}>
              <div className="progress-track" style={{ background: 'rgba(15,35,24,0.12)' }}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              {loadStatus && <p style={{ fontSize: 11, color: 'var(--brand-soft)', marginTop: 3 }}>{loadStatus}</p>}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--ink-secondary)', margin: '2px 0 0' }}>
              ~900MB one-time download · runs 100% on your device · works offline after
            </p>
          )}
        </div>
        {!isDownloading && (
          <button onClick={onInit} className="btn btn-primary btn-sm">
            Download AI Model
          </button>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   UPLOAD VIEW
════════════════════════════════════════ */
function UploadView({ initialScanMode }) {
  const [searchParams] = useSearchParams()
  const isScanMode = initialScanMode || searchParams.get('mode') === 'scan'
  const { processDocument, error, setError } = useDocument()
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [mode, setMode] = useState(isScanMode ? 'scan' : 'upload')

  function handleFileSelect(dataUrl, name) {
    setPreview(dataUrl)
    setFileName(name ?? 'Document')
    setError(null)
    setMode('preview')
  }

  function handleAnalyze() {
    if (preview) processDocument(preview)
  }

  function handleClear() {
    setPreview(null)
    setFileName(null)
    setMode('upload')
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--brand)', letterSpacing: '-0.02em', marginBottom: 6 }}>
          {mode === 'scan' ? 'Scan Document' : mode === 'preview' ? 'Review & Analyze' : 'Upload Document'}
        </h1>
        <p className="t-body">
          {mode === 'scan'
            ? 'Point your camera at the document and capture clearly'
            : mode === 'preview'
            ? 'Confirm this is the document you want to analyze'
            : 'Upload a PDF, JPG or PNG — or scan directly with your camera'}
        </p>
      </div>

      {/* Error alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-danger"
            style={{ marginBottom: '1.25rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {mode === 'scan' && (
          <motion.div key="scan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <CameraScanner
              onCapture={(dataUrl) => handleFileSelect(dataUrl, 'Camera capture')}
              onCancel={() => setMode('upload')}
            />
          </motion.div>
        )}

        {mode === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FileUploader onFileSelect={handleFileSelect} />
            <button
              onClick={() => setMode('scan')}
              style={{
                width: '100%', padding: '0.875rem',
                textAlign: 'center', fontSize: 14, fontWeight: 500,
                color: 'var(--brand-soft)', background: 'transparent',
                border: '1.5px dashed var(--border)', borderRadius: 'var(--r-xl)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.target.borderColor = 'var(--brand-soft)'; e.target.style.background = 'var(--brand-xpale)' }}
              onMouseLeave={e => { e.target.style.background = 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: 7, verticalAlign: 'middle' }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
              Use camera instead
            </button>

            {/* Privacy assurance */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px', background: 'var(--brand-xpale)', borderRadius: 'var(--r-md)' }}>
              <ShieldIcon size={14} color="var(--brand-soft)" />
              <span style={{ fontSize: 12, color: 'var(--brand-soft)', fontWeight: 500 }}>Your document never leaves your device — 100% private</span>
            </div>
          </motion.div>
        )}

        {mode === 'preview' && preview && (
          <motion.div key="preview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Document preview */}
            <div className="card-lg" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-secondary)' }}>{fileName}</span>
              </div>
              <div style={{ background: '#f0ede8', maxHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={preview} alt="Document" style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }} />
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleAnalyze} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Analyze Document
              </button>
              <button onClick={handleClear} className="btn btn-secondary" style={{ flexShrink: 0 }}>
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════
   PROCESSING VIEW
════════════════════════════════════════ */
const STEPS = [
  { id: 1, label: 'Reading document' },
  { id: 2, label: 'Extracting text via OCR' },
  { id: 3, label: 'AI understanding content' },
  { id: 4, label: 'Generating explanation' },
]

function ProcessingView() {
  const { processingStep, ocrProgress } = useDocument()

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
      {/* Animated orb */}
      <div style={{ width: 96, height: 96, margin: '0 auto 2rem', position: 'relative' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', inset: i * 12,
              borderRadius: 99, border: `${i === 2 ? 0 : 1.5}px solid var(--brand)`,
              background: i === 2 ? 'var(--brand)' : 'transparent',
              display: i === 2 ? 'flex' : 'block',
              alignItems: 'center', justifyContent: 'center',
            }}
            animate={i < 2 ? { scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] } : { rotate: 360 }}
            transition={i < 2
              ? { duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }
              : { duration: 6, repeat: Infinity, ease: 'linear' }
            }
          >
            {i === 2 && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand)', marginBottom: 8, letterSpacing: '-0.015em' }}>Analyzing your document</h2>
      <p className="t-body" style={{ marginBottom: '2.5rem' }}>Everything runs on your device. Nothing is uploaded.</p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340, margin: '0 auto 2rem', textAlign: 'left' }}>
        {STEPS.map(step => {
          const done = processingStep > step.id
          const active = processingStep === step.id
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.id * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 99, flexShrink: 0,
                border: `2px solid ${done ? 'var(--success)' : active ? 'var(--brand)' : 'var(--border)'}`,
                background: done ? 'var(--success)' : active ? 'var(--brand)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: done || active ? 'white' : 'var(--ink-faint)',
                fontSize: 11, fontWeight: 700,
              }}>
                {done ? <CheckIcon size={12} /> : active ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                    </svg>
                  </motion.div>
                ) : step.id}
              </div>
              <span style={{
                fontSize: 14, fontWeight: active ? 600 : 400,
                color: done ? 'var(--success)' : active ? 'var(--ink)' : 'var(--ink-faint)',
              }}>
                {step.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      {ocrProgress > 0 && ocrProgress < 100 && (
        <div style={{ maxWidth: 280, margin: '0 auto' }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${ocrProgress}%` }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6, textAlign: 'center' }}>OCR: {ocrProgress}%</p>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════
   GLOSSARY ANNOTATED TEXT
════════════════════════════════════════ */
function AnnotatedText({ text }) {
  if (!text) return null
  const terms = Object.keys(GLOSSARY)
  const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi')
  const parts = text.split(pattern)
  return (
    <span>
      {parts.map((part, i) => {
        const def = GLOSSARY[part?.toLowerCase()]
        if (def) {
          return (
            <span key={i} title={def} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textDecorationColor: 'var(--brand-soft)', cursor: 'help' }}>
              {part}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

/* ════════════════════════════════════════
   RESULTS VIEW
════════════════════════════════════════ */
function ResultsView({ onReset }) {
  const { result, redFlags, docType, image, ocrText, language, langConfig } = useDocument()
  const { speak, stop, speaking, supported } = useSpeech()
  const [checkState, setCheckState] = useState({})
  const [showDoc, setShowDoc] = useState(false)
  const [hasGoogleVoice, setHasGoogleVoice] = useState(true)

  // Check voice quality once on mount
  useEffect(() => {
    function checkVoices() {
      const voices = window.speechSynthesis?.getVoices() ?? []
      if (voices.length === 0) return // not loaded yet
      const langPrefix = langConfig.ttsLang.split('-')[0]
      const hasGoogle = voices.some(v =>
        v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('google')
      )
      setHasGoogleVoice(hasGoogle)
    }
    checkVoices()
    window.speechSynthesis?.addEventListener('voiceschanged', checkVoices)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', checkVoices)
  }, [langConfig])

  if (!result) {
    return (
      <div style={{ maxWidth: 480, margin: '4rem auto', textAlign: 'center', padding: '0 1.5rem' }}>
        <p className="t-body" style={{ marginBottom: '1.5rem' }}>No results to show yet.</p>
        <button onClick={onReset} className="btn btn-primary">Upload a document</button>
      </div>
    )
  }

  const docTypeLabel = DOC_TYPE_LABELS[docType] ?? 'Government Document'
  const risk = getRiskLevel(redFlags, result.actions)

  const audioText = [
    result.what, result.summary,
    result.actions?.map(a => `${a.task}${a.deadline ? '. By ' + a.deadline : ''}`).join('. '),
    result.consequence,
  ].filter(Boolean).join('. ')

  const riskBadge = risk === 'urgent'
    ? { cls: 'badge-danger', label: '🔴 Urgent' }
    : risk === 'attention'
    ? { cls: 'badge-warn', label: '🟡 Attention Needed' }
    : { cls: 'badge-safe', label: '🟢 Safe' }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: 780, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
        <button onClick={onReset} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-soft)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8l4 4" />
          </svg>
          Analyze another document
        </button>
        {supported && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <button
              onClick={() => speak(audioText, langConfig)}
              className={`btn btn-sm ${speaking ? 'btn-primary' : 'btn-secondary'}`}
              style={{ gap: 6 }}
            >
              {speaking ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                  </svg>
                  Stop
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  Read Aloud ({langConfig.full})
                </>
              )}
            </button>
            {!hasGoogleVoice && (
              <p style={{ fontSize: 11, color: 'var(--ink-muted)', textAlign: 'right' }}>
                💡 Install Google Text-to-Speech for better voice quality
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── Summary card ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card-lg" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span className="t-label">{docTypeLabel}</span>
            <span className={`badge ${riskBadge.cls}`}>{riskBadge.label}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, color: 'var(--brand)', lineHeight: 1.2, letterSpacing: '-0.015em', marginBottom: '1.5rem' }}>
            {result.what}
          </h2>

          {/* Key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            {result.amount_due && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Amount Due</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand)', letterSpacing: '-0.02em' }}>{result.amount_due}</p>
              </div>
            )}
            {result.deadline && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Pay Before</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand)', letterSpacing: '-0.01em' }}>{result.deadline}</p>
              </div>
            )}
            {result.from_whom && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Issued By</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>{result.from_whom}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── What this means ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="card-lg" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>What This Means</h3>
          <p style={{ fontSize: 15, color: 'var(--ink-secondary)', lineHeight: 1.75 }}>
            <AnnotatedText text={result.summary} />
          </p>
        </motion.div>

        {/* ── Action checklist ── */}
        {result.actions?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="card-lg" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>
              Action Checklist
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-muted)', marginLeft: 8 }}>({result.actions.length} items)</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.actions.map((action, i) => {
                const urg = action.urgency ?? 'low'
                const cls = urg === 'high' ? 'urgent' : urg === 'medium' ? 'medium' : 'low'
                return (
                  <label key={i} className={`action-item ${cls}`} style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={!!checkState[i]}
                      onChange={() => setCheckState(prev => ({ ...prev, [i]: !prev[i] }))}
                      style={{ width: 17, height: 17, borderRadius: 4, accentColor: 'var(--brand)', marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
                    />
                    <div>
                      <p style={{
                        fontSize: 14, lineHeight: 1.5,
                        color: checkState[i] ? 'var(--ink-muted)' : 'var(--ink)',
                        textDecoration: checkState[i] ? 'line-through' : 'none',
                        fontWeight: 500,
                      }}>
                        {action.task}
                      </p>
                      {action.deadline && (
                        <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>By {action.deadline}</p>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ── Risk alerts ── */}
        {(redFlags?.length > 0 || result.consequence) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {redFlags?.length > 0 && (
              <div className="card-lg" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--danger)', marginBottom: '0.75rem' }}>
                  ⚠️ Potential Issues Detected
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
                  {redFlags.map(flag => (
                    <li key={flag.id} style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55 }}>
                      {flag.message ?? flag.id}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.consequence && (
              <div className="card-lg" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warn)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--warn)', marginBottom: '0.75rem' }}>If Ignored</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.65 }}>{result.consequence}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Original document accordion ── */}
        {(image || ocrText) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="card-lg" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setShowDoc(!showDoc)}
              style={{
                width: '100%', padding: '1.125rem 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, color: 'var(--ink)',
              }}
            >
              Original Document
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: showDoc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence>
              {showDoc && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ borderTop: '1px solid var(--border-soft)', overflow: 'hidden' }}
                >
                  {image && <img src={image} alt="Original" style={{ width: '100%', maxHeight: 380, objectFit: 'contain', background: '#f0ede8', display: 'block' }} />}
                  {ocrText && (
                    <pre style={{ padding: '1rem', fontSize: 12, color: 'var(--ink-muted)', whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto', margin: 0 }}>
                      {ocrText}
                    </pre>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Reset */}
        <button onClick={onReset} className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
          ← Analyze another document
        </button>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════
   AI CHAT PANEL
════════════════════════════════════════ */
function AIChatPanel({ open, onClose }) {
  const { result } = useDocument()
  const [selected, setSelected] = useState(null)

  const questions = result
    ? [
        'What does this mean?',
        'Can I ignore this?',
        'What happens if I miss the deadline?',
        result.amount_due ? `Why is the amount ${result.amount_due}?` : 'What should I do first?',
      ]
    : ['What does this mean?', 'Can I ignore this?', 'What happens next?', 'Is this urgent?']

  function getAnswer(q) {
    if (!result) return 'Upload and analyze a document first to get personalized answers.'
    if (q.includes('ignore')) return result.consequence ? `This document needs attention. If ignored: ${result.consequence}` : 'Please review the action checklist — some items may need your attention.'
    if (q.includes('deadline')) return result.deadline ? `The deadline is ${result.deadline}. Make sure to complete required actions before this date.` : 'No specific deadline was found in this document.'
    if (q.includes('amount')) return result.summary ?? 'The amount details are in the document summary.'
    if (q.includes('do first')) return result.actions?.[0]?.task ?? 'Review the action checklist for recommended steps.'
    return result.summary ?? 'See the explanation above for a plain-language summary.'
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 200, backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32 }}
            className="ai-chat-panel-desktop"
            style={{
              position: 'fixed', zIndex: 210,
              bottom: 0, right: 0, left: 0,
              borderRadius: 'var(--r-2xl) var(--r-2xl) 0 0',
              padding: '1.5rem',
              maxHeight: '70vh', overflowY: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 30, height: 30, background: 'var(--brand)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Ask Samajh</h3>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)', margin: 0 }}>
                    {result ? 'Questions about your document' : 'Analyze a document first'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1, padding: '4px 8px' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions.map(q => (
                <button
                  key={q}
                  onClick={() => setSelected(selected === q ? null : q)}
                  style={{
                    textAlign: 'left', padding: '12px 14px',
                    borderRadius: 'var(--r-lg)', border: '1.5px solid',
                    borderColor: selected === q ? 'var(--brand-soft)' : 'var(--border-soft)',
                    background: selected === q ? 'var(--brand-xpale)' : 'var(--surface)',
                    fontSize: 14, fontWeight: 500, color: 'var(--ink)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {q}
                </button>
              ))}

              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ background: 'var(--brand-xpale)', borderRadius: 'var(--r-lg)', padding: '1rem', marginTop: 4 }}
                  >
                    <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.7, margin: 0 }}>
                      {getAnswer(selected)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ════════════════════════════════════════
   HISTORY RESULT VIEW — shows a saved doc
════════════════════════════════════════ */
function HistoryResultView({ doc, onBack }) {
  const { langConfig } = useDocument()
  const { speak, speaking, supported } = useSpeech()
  const [checkState, setCheckState] = useState({})
  const [showDoc, setShowDoc] = useState(false)

  const { result, redFlags, docType, image, ocrText } = doc
  if (!result) return (
    <div style={{ maxWidth: 480, margin: '4rem auto', textAlign: 'center', padding: '0 1.5rem' }}>
      <p style={{ color: 'var(--ink-muted)', marginBottom: '1rem' }}>No details available for this document.</p>
      <button onClick={onBack} className="btn btn-secondary">← Back</button>
    </div>
  )

  const docTypeLabel = DOC_TYPE_LABELS[docType] ?? 'Government Document'
  const risk = getRiskLevel(redFlags, result.actions)
  const riskBadge = risk === 'urgent'
    ? { cls: 'badge-danger', label: '🔴 Urgent' }
    : risk === 'attention'
    ? { cls: 'badge-warn', label: '🟡 Attention Needed' }
    : { cls: 'badge-safe', label: '🟢 Safe' }

  const audioText = [
    result.what, result.summary,
    result.actions?.map(a => `${a.task}${a.deadline ? '. By ' + a.deadline : ''}`).join('. '),
    result.consequence,
  ].filter(Boolean).join('. ')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: 780, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-soft)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8l4 4" />
          </svg>
          Back
        </button>
        {supported && (
          <button
            onClick={() => speak(audioText, langConfig)}
            className={`btn btn-sm ${speaking ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: 6 }}
          >
            {speaking ? (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Stop</>
            ) : (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>Read Aloud</>
            )}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Summary card */}
        <div className="card-lg" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="t-label">{docTypeLabel}</span>
            <span className={`badge ${riskBadge.cls}`}>{riskBadge.label}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-muted)', marginLeft: 'auto' }}>{formatDate(doc.date)}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--brand)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            {result.what}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            {result.amount_due && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Amount Due</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand)' }}>{result.amount_due}</p>
              </div>
            )}
            {result.deadline && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Pay Before</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)' }}>{result.deadline}</p>
              </div>
            )}
            {result.from_whom && (
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
                <p className="t-caption" style={{ marginBottom: 4 }}>Issued By</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>{result.from_whom}</p>
              </div>
            )}
          </div>
        </div>

        {/* What this means */}
        <div className="card-lg" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>What This Means</h3>
          <p style={{ fontSize: 15, color: 'var(--ink-secondary)', lineHeight: 1.75 }}>
            <AnnotatedText text={result.summary} />
          </p>
        </div>

        {/* Action checklist */}
        {result.actions?.length > 0 && (
          <div className="card-lg" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>
              Action Checklist
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-muted)', marginLeft: 8 }}>({result.actions.length} items)</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.actions.map((action, i) => {
                const urg = action.urgency ?? 'low'
                const cls = urg === 'high' ? 'urgent' : urg === 'medium' ? 'medium' : 'low'
                return (
                  <label key={i} className={`action-item ${cls}`} style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={!!checkState[i]}
                      onChange={() => setCheckState(prev => ({ ...prev, [i]: !prev[i] }))}
                      style={{ width: 17, height: 17, accentColor: 'var(--brand)', marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
                    />
                    <div>
                      <p style={{ fontSize: 14, lineHeight: 1.5, color: checkState[i] ? 'var(--ink-muted)' : 'var(--ink)', textDecoration: checkState[i] ? 'line-through' : 'none', fontWeight: 500 }}>
                        {action.task}
                      </p>
                      {action.deadline && <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>By {action.deadline}</p>}
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {/* Risk alerts */}
        {(redFlags?.length > 0 || result.consequence) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {redFlags?.length > 0 && (
              <div className="card-lg" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--danger)', marginBottom: '0.75rem' }}>⚠️ Potential Issues Detected</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
                  {redFlags.map(flag => (
                    <li key={flag.id} style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55 }}>{flag.message ?? flag.id}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.consequence && (
              <div className="card-lg" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warn)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--warn)', marginBottom: '0.75rem' }}>If Ignored</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.65 }}>{result.consequence}</p>
              </div>
            )}
          </div>
        )}

        {/* Original document */}
        {(image || ocrText) && (
          <div className="card-lg" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setShowDoc(!showDoc)}
              style={{ width: '100%', padding: '1.125rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}
            >
              Original Document
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showDoc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <AnimatePresence>
              {showDoc && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ borderTop: '1px solid var(--border-soft)', overflow: 'hidden' }}>
                  {image && <img src={image} alt="Original" style={{ width: '100%', maxHeight: 380, objectFit: 'contain', background: '#f0ede8', display: 'block' }} />}
                  {ocrText && <pre style={{ padding: '1rem', fontSize: 12, color: 'var(--ink-muted)', whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto', margin: 0 }}>{ocrText}</pre>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════
   APP PAGE (main export)
════════════════════════════════════════ */
export default function AppPage() {
  const { language, setLanguage, result, processingStep, history, initModel, llmStatus, loadProgress, loadStatus, reset } = useDocument()
  const [chatOpen, setChatOpen] = useState(false)
  const [historyDoc, setHistoryDoc] = useState(null)   // doc opened from history
  const [searchParams] = useSearchParams()
  const initialScanMode = searchParams.get('mode') === 'scan'

  // Determine which view to show
  const isProcessing = processingStep > 0 && processingStep < 4 && !result
  const hasResult = !!result

  function handleReset() {
    reset()
    setHistoryDoc(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar
        language={language}
        setLanguage={setLanguage}
        onAIClick={() => setChatOpen(true)}
        historyCount={history.length}
        onViewDoc={(doc) => { setHistoryDoc(doc); reset() }}
      />

      <ModelBanner
        status={llmStatus}
        progress={loadProgress}
        loadStatus={loadStatus}
        onInit={initModel}
      />

      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          {historyDoc ? (
            <motion.div key="history-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HistoryResultView doc={historyDoc} onBack={() => setHistoryDoc(null)} />
            </motion.div>
          ) : isProcessing ? (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProcessingView />
            </motion.div>
          ) : hasResult ? (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResultsView onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <UploadView initialScanMode={initialScanMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
