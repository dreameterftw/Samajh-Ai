import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocument } from '../context/DocumentContext'
import FileUploader from '../components/upload/FileUploader'
import DocumentPreview from '../components/upload/DocumentPreview'
import UploadActions from '../components/upload/UploadActions'
import CameraScanner from '../components/upload/CameraScanner'

export default function Upload() {
  const [searchParams] = useSearchParams()
  const isScanMode = searchParams.get('mode') === 'scan'
  const { processDocument, error, setError } = useDocument()
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [showCamera, setShowCamera] = useState(isScanMode)

  function handleFileSelect(dataUrl, name) {
    setPreview(dataUrl)
    setFileName(name)
    setError(null)
  }

  function handleAnalyze() {
    if (preview) processDocument(preview)
  }

  function handleClear() {
    setPreview(null)
    setFileName(null)
    setShowCamera(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-page-title text-[var(--text)] mb-2">
        {showCamera ? 'Scan Document' : 'Upload Document'}
      </h1>
      <p className="text-body text-[var(--text-secondary)] mb-8">
        {showCamera
          ? 'Point your camera at the document and capture'
          : 'Upload a PDF, JPG or PNG to analyze'}
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-[20px] bg-red-50 border border-red-200 text-[var(--danger)] text-sm">
          {error}
        </div>
      )}

      {showCamera && !preview ? (
        <CameraScanner
          onCapture={(dataUrl) => {
            setPreview(dataUrl)
            setFileName('Camera capture')
            setShowCamera(false)
          }}
          onCancel={() => setShowCamera(false)}
        />
      ) : !preview ? (
        <div className="space-y-4">
          <FileUploader onFileSelect={handleFileSelect} />
          {!isScanMode && (
            <button
              onClick={() => setShowCamera(true)}
              className="w-full py-3 text-center text-[var(--primary)] font-medium hover:bg-[var(--primary-light)] rounded-[20px] transition-colors"
            >
              Use camera instead →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <DocumentPreview image={preview} fileName={fileName} />
          <UploadActions
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            disabled={!preview}
          />
        </div>
      )}
    </div>
  )
}
