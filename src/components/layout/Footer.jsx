import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white/90 mt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-serif font-semibold text-white text-xl tracking-tight">
                Samajh AI
              </span>
            </div>
            <p className="text-white/60 text-[15px] max-w-sm leading-relaxed">
              Understand government documents in simple language.
              Your documents never leave your device — 100% private & offline.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/upload', label: 'Upload Document' },
                { to: '/history', label: 'History' },
                { to: '/settings', label: 'Settings' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-[15px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Supported Documents
            </h4>
            <ul className="space-y-3">
              {['Electricity Bills', 'Legal Notices', 'Court Summons', 'Land Records', 'Bank Letters'].map(doc => (
                <li key={doc} className="text-white/60 text-[15px]">{doc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Samajh AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your documents never leave your device
          </div>
        </div>
      </div>
    </footer>
  )
}
