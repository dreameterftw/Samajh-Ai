import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUPPORTED_DOCS } from '../data/supportedDocs'

/* ─────────────────────────────────────
   FADE-UP SCROLL REVEAL
───────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────
   ICONS
───────────────────────────────────── */
function Shield({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

/* ─────────────────────────────────────
   STATIC DATA
───────────────────────────────────── */
const TRUST_BADGES = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    label: '100% Private', sub: 'Your data stays on your device',
  },
  {
    icon: <Shield size={16}/>,
    label: 'Works Offline', sub: 'No internet required',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    label: 'Supports 4+', sub: 'Indian Languages',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    label: 'Secure & Reliable', sub: 'Built for citizens like you',
  },
]

const HOW_IT_WORKS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    label: 'Upload', desc: 'Upload a document or scan it using your camera',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    label: 'AI Understands', desc: 'Our AI reads and analyzes the document',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    label: 'Get Explanation', desc: 'Receive plain-language explanation, deadlines and key info',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    label: 'Take Action', desc: 'Follow clear action steps with confidence',
  },
]

/* ─────────────────────────────────────
   HERO MOCKUP — two cards side by side, no overlap
───────────────────────────────────── */
function HeroMockup() {
  /*
    Reference layout:
    - Doc card:    ~53% of total width, full natural height
    - Gap:         ~40px of breathing room, AI button floats in center of gap
    - Result card: ~38% of total width, ~80% the height of doc card, vertically centered
  */
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      width: '100%',
      maxWidth: 570,
    }}>

      {/* ── Doc card — tall, 53% ── */}
      <div style={{
        flex: '0 0 53%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(0,0,0,0.10)',
        background: 'white',
      }}>
        <img
          src="/hero-doc.png"
          alt="Your Document"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* ── AI sparkle button — absolutely centered in the 40px gap ── */}
      <div style={{
        position: 'absolute',
        /* sits at: left edge of doc card (0) + 53% of 570px = ~302px, then + half gap (20px) = ~322px, minus half button (24px) */
        left: 'calc(53% + 20px - 24px)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 48, height: 48,
        background: '#0F2318', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 22px rgba(15,35,24,0.42)',
        zIndex: 3,
        flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l1.4 4.2L17.8 8l-4.4 1.8L12 14l-1.4-4.2L6.2 8l4.4-1.8L12 2z"/>
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" opacity="0.75"/>
          <path d="M5 15l.6 1.6L7 17l-1.4.6L5 19l-.6-1.6L3 17l1.4-.6L5 15z" opacity="0.55"/>
        </svg>
      </div>

      {/* ── Result card — 38%, vertically centered ── */}
      <div style={{
        flex: '0 0 38%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(0,0,0,0.10)',
        background: 'white',
        alignSelf: 'center',
      }}>
        <img
          src="/hero-result.png"
          alt="Explained by Samajh AI"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────
   SECTION WAVE DIVIDER
───────────────────────────────────── */
function WaveDown({ fromColor = '#ffffff', toColor = '#F8F6F1' }) {
  return (
    <div style={{ lineHeight: 0, background: fromColor }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 56 }}>
        <path d="M0,0 C360,56 1080,56 1440,0 L1440,56 L0,56 Z" fill={toColor} />
      </svg>
    </div>
  )
}

function WaveUp({ fromColor = '#F8F6F1', toColor = '#ffffff' }) {
  return (
    <div style={{ lineHeight: 0, background: fromColor }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 56 }}>
        <path d="M0,56 C360,0 1080,0 1440,56 L1440,0 L0,0 Z" fill={toColor} />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────
   GLOBAL RESPONSIVE STYLES (injected once)
───────────────────────────────────── */
const RESPONSIVE_CSS = `
  .landing-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .landing-hero-mockup { display: flex; justify-content: center; }
  .landing-trust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  .landing-hiw-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .landing-features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  .landing-docs-row::-webkit-scrollbar { display: none; }
  .landing-privacy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: center;
  }
  .landing-nav-links { display: flex; gap: 28px; align-items: center; }
  .landing-cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }

  @media (max-width: 900px) {
    .landing-hero-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .landing-hero-mockup { order: -1; }
    .landing-trust-grid { grid-template-columns: repeat(2, 1fr); }
    .landing-hiw-grid { grid-template-columns: repeat(2, 1fr); }
    .landing-features-grid { grid-template-columns: repeat(2, 1fr); }
    .landing-privacy-grid { grid-template-columns: 1fr; }
    .landing-nav-links { display: none; }
  }
  @media (max-width: 520px) {
    .landing-trust-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .landing-hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .landing-features-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .landing-docs-grid { grid-template-columns: 1fr 1fr; }
    .landing-cta-btns { flex-direction: column; }
    .landing-cta-btns button { width: 100%; justify-content: center; }
  }
`

/* ─────────────────────────────────────
   LANDING PAGE
───────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#0F2318' }}>

      {/* inject responsive styles */}
      <style>{RESPONSIVE_CSS}</style>

      {/* ══════════ NAVBAR ══════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(248,246,241,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2DDD6',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: '#0F2318', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(15,35,24,0.2)' }}>
              <Shield size={17} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#0F2318', lineHeight: 1.15, letterSpacing: '-0.02em' }}>Samajh AI</div>
              <div style={{ fontSize: 10, color: '#7A8E7F', fontWeight: 500 }}>Understand. Act. Stress less.</div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="landing-nav-links">
            {[['#how-it-works','How It Works'],['#supported','Supported Documents'],['#features','Features'],['#about','About Us']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: 13.5, fontWeight: 500, color: '#4A5E4F', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color='#0F2318'} onMouseLeave={e => e.target.style.color='#4A5E4F'}
              >{label}</a>
            ))}
          </div>

          <button
            onClick={() => navigate('/app')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: '#0F2318', color: 'white', border: 'none',
              borderRadius: 9999, padding: '9px 20px',
              fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(15,35,24,0.22)', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background='#1a3828'}
            onMouseLeave={e => e.currentTarget.style.background='#0F2318'}
          >
            Get Started
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </button>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background photo */}
        <img
          src="/hero-bg.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center right', zIndex: 0 }}
        />
        {/* Gradient overlay: opaque left → transparent right */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(100deg, rgba(248,246,241,1) 0%, rgba(248,246,241,0.97) 38%, rgba(248,246,241,0.7) 62%, rgba(248,246,241,0.15) 100%)',
        }} />

        <div className="landing-hero-grid" style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '2.75rem 1.5rem clamp(2rem,4vw,3.5rem)' }}>

          {/* ── Left copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Headline — Playfair Display serif like the reference */}
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#0F2318',
              margin: '0 0 1.1rem',
            }}>
              Understand<br />
              Government<br />
              Documents<br />
              <em style={{
                fontStyle: 'italic',
                fontWeight: 700,
                color: '#4A7C59',
                textDecoration: 'underline',
                textDecorationColor: '#A8C8A8',
                textDecorationThickness: 2,
                textUnderlineOffset: 6,
              }}>
                in Simple Language
              </em>
            </h1>

            <p style={{ fontSize: 16, color: '#4A6B52', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: 420 }}>
              Upload any notice, bill, or letter and get clear explanations, deadlines, and action steps in seconds.
            </p>

            {/* CTA buttons */}
            <div className="landing-cta-btns" style={{ marginBottom: '2.25rem' }}>
              <button onClick={() => navigate('/app')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#0F2318', color: 'white', border: 'none',
                borderRadius: 10, padding: '13px 24px', fontSize: 14.5, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 14px rgba(15,35,24,0.28)',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#1a3828'}
                onMouseLeave={e => e.currentTarget.style.background='#0F2318'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload Document
              </button>
              <button onClick={() => navigate('/app?mode=scan')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'rgba(255,255,255,0.85)', color: '#0F2318',
                border: '1.5px solid #C5D9C8', borderRadius: 10,
                padding: '13px 24px', fontSize: 14.5, fontWeight: 600,
                cursor: 'pointer', backdropFilter: 'blur(6px)',
              }}
                onMouseEnter={e => e.currentTarget.style.background='white'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.85)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Scan with Camera
              </button>
            </div>

            {/* Trust badges — 4 columns on desktop, 2 on mobile */}
            <div className="landing-trust-grid">
              {TRUST_BADGES.map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <div style={{
                    width: 30, height: 30, flexShrink: 0,
                    background: 'rgba(255,255,255,0.75)', border: '1px solid #D5E3D8',
                    borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3D6B4F',
                  }}>{b.icon}</div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F2318', lineHeight: 1.25 }}>{b.label}</div>
                    <div style={{ fontSize: 11, color: '#6B8F71', lineHeight: 1.45 }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — mockup ── */}
          <motion.div
            className="landing-hero-mockup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroMockup />
          </motion.div>
        </div>

        {/* Wave transition into next section */}
        <div style={{ position: 'relative', zIndex: 2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 52" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 52 }}>
            <path d="M0,0 C480,52 960,52 1440,0 L1440,52 L0,52 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════ TRUST STRIP ══════════ */}
      <div style={{ background: 'white', padding: '22px 1.5rem 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Shield size={14} color="#3D6B4F" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D5A3A' }}>Built for real people dealing with real paperwork</span>
          </div>
          <div style={{ width: 1, height: 14, background: '#D5E3D8' }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {['No sign-up required', 'No data leaves your device', 'Completely private'].map((t, i) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#4A6B52' }}>
                {i > 0 && <span style={{ color: '#BDD5BF' }}>•</span>}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wave: white → #F8F6F1 */}
      <WaveDown fromColor="white" toColor="#F8F6F1" />

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" style={{ background: '#F8F6F1', padding: '2rem 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700,
              color: '#0F2318', margin: '0 0 8px', letterSpacing: '-0.01em',
            }}>We help you understand</h2>
            <p style={{ fontSize: 15, color: '#5A7A62', margin: 0 }}>Every feature built to make government paperwork stress-free</p>
          </FadeUp>

          <div className="landing-features-grid">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A6B8A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                ),
                iconBg: '#EBF2FA',
                label: 'Complex Documents',
                desc: 'Government notices are full of legal jargon and dense language. We break them down into plain, simple sentences so anyone can understand what\'s being asked of them.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B05A1A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                ),
                iconBg: '#FFF3E8',
                label: 'Hidden Risks',
                desc: 'Detect urgent deadlines, penalty warnings, and potential fraud patterns automatically. Know exactly what needs your immediate attention before it becomes a problem.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A7A4A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                ),
                iconBg: '#E8F8F0',
                label: 'Action Steps',
                desc: 'Don\'t just understand — know exactly what to do next. Get a clear, prioritised checklist of actions with deadlines so nothing falls through the cracks.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B6DA8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ),
                iconBg: '#EEF0FB',
                label: 'Multiple Languages',
                desc: 'Read and listen to explanations in Hindi, Tamil, Telugu, and English. Designed for every Indian citizen, regardless of which language they\'re most comfortable in.',
              },
            ].map((f, i) => (
              <FadeUp key={f.label} delay={i * 0.06}>
                <div style={{
                  background: 'white', border: '1px solid #E8E4DE',
                  borderRadius: 14, padding: '1.5rem',
                  height: '100%', boxSizing: 'border-box',
                }}>
                  <div style={{
                    width: 42, height: 42,
                    background: f.iconBg,
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12,
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F2318', marginBottom: 8 }}>{f.label}</div>
                  <div style={{ fontSize: 12.5, color: '#5A7A62', lineHeight: 1.7 }}>{f.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: #F8F6F1 → white */}
      <WaveUp fromColor="#F8F6F1" toColor="white" />

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how-it-works" style={{ background: 'white', padding: '4rem 1.5rem 5.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700,
              color: '#0F2318', margin: '0 0 8px', letterSpacing: '-0.01em',
            }}>How Samajh AI Works</h2>
            <p style={{ fontSize: 15, color: '#5A7A62', margin: 0 }}>Four simple steps to clarity</p>
          </FadeUp>

          <div className="landing-hiw-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeUp key={step.label} delay={i * 0.09}>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  {/* Connector arrow — desktop only handled via CSS */}
                  <div style={{
                    width: 58, height: 58,
                    background: i === 0 ? '#0F2318' : '#F0F5F1',
                    border: `2px solid ${i === 0 ? '#0F2318' : '#D5E3D8'}`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: i === 0 ? 'white' : '#3D6B4F',
                    boxShadow: i === 0 ? '0 4px 18px rgba(15,35,24,0.22)' : 'none',
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: i === 0 ? '#0F2318' : '#E8F0E9',
                    color: i === 0 ? 'white' : '#3D6B4F',
                    fontSize: 10, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}>{i + 1}</div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0F2318', margin: '0 0 6px' }}>{step.label}</h3>
                  <p style={{ fontSize: 12.5, color: '#5A7A62', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: white → #F8F6F1 */}
      <WaveDown fromColor="white" toColor="#F8F6F1" />

      {/* ══════════ SUPPORTED DOCUMENTS ══════════ */}
      <section id="supported" style={{ background: '#F8F6F1', padding: '4rem 0 5.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700,
              color: '#0F2318', margin: '0 0 8px', letterSpacing: '-0.01em',
            }}>Supported Documents</h2>
            <p style={{ fontSize: 15, color: '#5A7A62', margin: 0 }}>We handle the documents that matter in your daily life</p>
          </FadeUp>

          {/* All 8 cards — equal width, single row, scrollable on mobile */}
          <FadeUp>
            <div className="landing-docs-row" style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              {SUPPORTED_DOCS.map((doc) => {
                const accentMap = {
                  electricity: { bg: '#FFF8EC' },
                  water:       { bg: '#EBF4FF' },
                  legal:       { bg: '#FFF0EB' },
                  court:       { bg: '#F2EEFF' },
                  land:        { bg: '#E8F8F0' },
                  property:    { bg: '#FFEDED' },
                  bank:        { bg: '#EEF0FB' },
                  scheme:      { bg: '#FFF3E8' },
                }
                const accent = accentMap[doc.id] ?? { bg: '#E8F0E9' }

                return (
                  <div key={doc.id} style={{
                    flex: '1 1 0',
                    minWidth: 100,   /* prevents cards from going too narrow */
                    background: 'white',
                    border: '1px solid #E8E4DE',
                    borderRadius: 14,
                    padding: '1.1rem 0.6rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      width: 40, height: 40,
                      background: accent.bg,
                      borderRadius: 9,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, margin: '0 auto 9px',
                    }}>
                      {doc.icon}
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#0F2318', marginBottom: 4, lineHeight: 1.3 }}>{doc.name}</div>
                    <div style={{ fontSize: 10.5, color: '#7A8E7F', lineHeight: 1.5 }}>{doc.description}</div>
                  </div>
                )
              })}
            </div>
          </FadeUp>

          {/* "View all" button */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#0F2318',
              border: '1.5px solid #D5E3D8', borderRadius: 9999,
              padding: '10px 22px', fontSize: 13.5, fontWeight: 600,
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0F2318'; e.currentTarget.style.background = '#F0F5F1' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5E3D8'; e.currentTarget.style.background = 'white' }}
            >
              View all document types
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Wave: #F8F6F1 → #E8F0E9 */}
      <WaveUp fromColor="#F8F6F1" toColor="#E8F0E9" />

      {/* ══════════ PRIVACY / CTA ══════════ */}
      <section id="about" style={{ background: '#E8F0E9', padding: '4rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <div className="landing-privacy-grid" style={{
              background: 'white', border: '1px solid #C5D9C8',
              borderRadius: 20, padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}>
              {/* Left */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <div style={{ width: 60, height: 60, background: '#0F2318', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={26} color="white" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 20, fontWeight: 700, color: '#0F2318', margin: '0 0 8px',
                  }}>Your privacy is our priority</h3>
                  <p style={{ fontSize: 14, color: '#3D5A46', lineHeight: 1.7, margin: '0 0 14px' }}>
                    Samajh AI works completely offline. Your documents are never uploaded or shared. What you see is only for you.
                  </p>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {['No Data Leaves Device', 'Delete Anytime', 'Trusted by Citizens'].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#3D6B4F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3"/></svg>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#2D5A3A' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 19, fontWeight: 700, color: '#0F2318', margin: '0 0 6px',
                }}>
                  Ready to understand<br />your documents?
                </p>
                <p style={{ fontSize: 13.5, color: '#4A6B52', margin: '0 0 20px' }}>Start now — it's free, private and instant.</p>
                <button
                  onClick={() => navigate('/app')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#0F2318', color: 'white', border: 'none',
                    borderRadius: 10, padding: '12px 22px',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(15,35,24,0.28)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='#1a3828'}
                  onMouseLeave={e => e.currentTarget.style.background='#0F2318'}
                >
                  Get Started Now →
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Wave: #E8F0E9 → white */}
      <WaveDown fromColor="#E8F0E9" toColor="white" />

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: 'white', padding: '1.75rem 1.5rem', borderTop: '1px solid #E8E4DE' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 28, height: 28, background: '#0F2318', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 13 }}>S</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0F2318' }}>Samajh AI</span>
            <span style={{ fontSize: 12.5, color: '#8A9E8E' }}>— Understand government documents in simple language</span>
          </div>
          <p style={{ fontSize: 12, color: '#8A9E8E', margin: 0 }}>Your documents never leave your device. Ever.</p>
        </div>
      </footer>
    </div>
  )
}
