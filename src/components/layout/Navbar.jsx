import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '#how-it-works', label: 'How It Works' },
  { to: '#supported-documents', label: 'Supported Documents' },
  { to: '#features', label: 'Features' },
  { to: '#about-us', label: 'About Us' },
]

export default function Navbar({ minimal = false }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <nav className="sticky top-0 z-50 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#EBEAE6]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <Link to={isLanding ? '/' : '/dashboard'} className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#0B251C] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-[#0B251C] text-lg leading-none tracking-tight">
              Samajh AI
            </span>
            <span className="text-[10px] text-[#7A7873] mt-1 font-medium tracking-wide">
              Understand. Act. Stress less.
            </span>
          </div>
        </Link>

        {/* Central Links (hidden on mobile) */}
        {!minimal && isLanding && (
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.to}
                className="text-[14px] font-medium text-[#5A5853] hover:text-[#0B251C] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B251C] text-white text-[14px] font-semibold hover:bg-[#153a2d] transition-all duration-300 shadow-sm"
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.33 8h9.34M8.67 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

      </div>
    </nav>
  )
}
