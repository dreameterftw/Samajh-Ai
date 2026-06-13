import { getGreeting } from '../utils/formatter'
import { useDocument } from '../context/DocumentContext'
import ModelLoader from '../components/common/ModelLoader'
import UploadCard from '../components/dashboard/UploadCard'
import ScanCard from '../components/dashboard/ScanCard'
import RecentDocuments from '../components/dashboard/RecentDocuments'
import StatsCards from '../components/dashboard/StatsCards'
import ActivityFeed from '../components/dashboard/ActivityFeed'

export default function Dashboard() {
  const { history, initModel, llmStatus, loadProgress, loadStatus } = useDocument()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-10">
        <h1 className="text-page-title text-[var(--text)]">
          {getGreeting()} 👋
        </h1>
        <p className="text-body text-[var(--text-secondary)] mt-2">
          What would you like to do?
        </p>
      </div>

      <ModelLoader
        status={llmStatus}
        progress={loadProgress}
        loadStatus={loadStatus}
        onInit={initModel}
      />

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <UploadCard />
        <ScanCard />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentDocuments history={history} />
          <ActivityFeed history={history} />
        </div>
        <StatsCards history={history} />
      </div>
    </div>
  )
}
