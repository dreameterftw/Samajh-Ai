import { useDocument } from '../context/DocumentContext'
import ProcessingAnimation from '../components/processing/ProcessingAnimation'
import AnalysisSteps from '../components/processing/AnalysisSteps'
import ProgressTracker from '../components/processing/ProgressTracker'

export default function Processing() {
  const { processingStep, ocrProgress } = useDocument()

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
      <ProcessingAnimation />
      <h1 className="text-section-title text-[var(--text)] mb-2">Analyzing your document</h1>
      <p className="text-body text-[var(--text-secondary)] mb-10">
        Everything runs on your device. Nothing is uploaded.
      </p>
      <AnalysisSteps currentStep={processingStep} />
      <ProgressTracker progress={ocrProgress} />
    </div>
  )
}
