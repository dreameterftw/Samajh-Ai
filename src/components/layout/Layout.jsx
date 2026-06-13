import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AIChatButton from '../chat/AIChatButton'

const MOBILE_NAV = [
  { to: '/dashboard', label: 'Home', icon: '🏠' },
  { to: '/history', label: 'History', icon: '📋' },
  { to: '/upload?mode=scan', label: 'Scan', icon: '📷' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const hideMobileNav = isLanding || location.pathname === '/processing'

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar minimal={isLanding} />

      <main className={`flex-1 ${hideMobileNav ? '' : 'pb-20 md:pb-0'}`}>
        {children}
      </main>

      {isLanding && <Footer />}

      {!hideMobileNav && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface)]/90 backdrop-blur-xl border-t border-[var(--border-subtle)] z-40">
          <div className="flex justify-around py-2">
            {MOBILE_NAV.map(item => {
              const active = location.pathname === item.to ||
                (item.to.includes('scan') && location.pathname === '/upload')
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs mt-0.5 font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}

      {!isLanding && location.pathname !== '/processing' && <AIChatButton />}
    </div>
  )
}
