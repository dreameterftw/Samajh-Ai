import { useDocument, LANGUAGES } from '../context/DocumentContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { clearAll } from '../utils/storage'

export default function Settings() {
  const { language, setLanguage, llmStatus, initModel, loadProgress, loadStatus } = useDocument()

  async function handleClearHistory() {
    if (window.confirm('Clear all document history? This cannot be undone.')) {
      await clearAll()
      window.location.reload()
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6">
      <h1 className="text-page-title text-[var(--text)] mb-2">Settings</h1>
      <p className="text-body text-[var(--text-secondary)] mb-8">
        Customize your Samajh experience
      </p>

      <Card>
        <h2 className="font-semibold text-[var(--text)] mb-4">Language</h2>
        <p className="text-caption text-[var(--text-secondary)] mb-4">
          Default language for document analysis
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                language === lang.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background)] text-[var(--text-secondary)] hover:bg-[var(--primary-light)]'
              }`}
            >
              {lang.label} {lang.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-[var(--text)] mb-4">AI Model</h2>
        <p className="text-caption text-[var(--text-secondary)] mb-4">
          Status: {llmStatus === 'ready' ? '✓ Ready' : llmStatus === 'downloading' ? 'Downloading...' : 'Not loaded'}
        </p>
        {llmStatus === 'downloading' && (
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${loadProgress}%` }} />
          </div>
        )}
        {llmStatus !== 'ready' && llmStatus !== 'downloading' && (
          <Button size="sm" onClick={initModel}>Download AI Model</Button>
        )}
        <p className="text-caption text-[var(--text-secondary)] mt-3">
          Runs entirely on your device. ~900MB one-time download.
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold text-[var(--text)] mb-4">Privacy</h2>
        <p className="text-body text-[var(--text-secondary)]">
          Your documents never leave your device. All OCR and AI processing happens locally in your browser.
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold text-[var(--text)] mb-4">Data</h2>
        <Button variant="danger" size="sm" onClick={handleClearHistory}>
          Clear All History
        </Button>
      </Card>
    </div>
  )
}
