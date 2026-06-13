import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DocumentProvider } from '../context/DocumentContext'
import Landing from '../pages/Landing'
import AppPage from '../pages/AppPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />

          {/* Main app — handles upload / processing / results */}
          <Route path="/app" element={<AppPage />} />

          {/* Legacy routes redirect to /app */}
          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
          <Route path="/upload"    element={<Navigate to="/app" replace />} />
          <Route path="/processing" element={<Navigate to="/app" replace />} />
          <Route path="/results"   element={<Navigate to="/app" replace />} />
          <Route path="/history"   element={<Navigate to="/app" replace />} />
          <Route path="/settings"  element={<Navigate to="/app" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DocumentProvider>
    </BrowserRouter>
  )
}
