import Button from '../common/Button'

export default function UploadActions({ onAnalyze, onClear, disabled }) {
  return (
    <div className="flex gap-3">
      <Button onClick={onAnalyze} disabled={disabled} className="flex-1">
        Analyze Document
      </Button>
      <Button variant="secondary" onClick={onClear}>
        Clear
      </Button>
    </div>
  )
}
