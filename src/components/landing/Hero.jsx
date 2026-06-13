import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-20 bg-[#F7F6F3]">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D1CFCA] bg-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-[#5A5853] mb-6">
              <span className="text-[#8B7355] text-xs">✦</span> AI-Powered Document Understanding
            </div>

            {/* Heading */}
            <h1 className="text-hero text-[#0B251C] leading-[1.1] tracking-tight">
              Understand <br className="hidden sm:inline" />
              Government Documents <br />
              in <span className="underline-handdrawn italic font-serif font-medium text-[#0B251C]">Simple Language</span>
            </h1>

            {/* Subtext */}
            <p className="text-[17px] text-[#5A5853] mt-8 max-w-xl leading-relaxed">
              Upload any notice, bill, or letter and get clear explanations, deadlines, and action steps in seconds.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link to="/dashboard" className="flex-1 sm:flex-initial">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B251C] text-white text-[15px] font-bold hover:bg-[#153a2d] transition-all duration-300 shadow-sm cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Document
                </button>
              </Link>
              <Link to="/upload?mode=scan" className="flex-1 sm:flex-initial">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-[#D1CFCA] bg-white text-[#0B251C] text-[15px] font-bold hover:bg-[#FAF9F6] transition-all duration-300 cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Scan with Camera
                </button>
              </Link>
            </div>

            {/* Horizontal Row of 4 Trust Items */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t border-[#EBEAE6] pt-8">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                  title: '100% Private',
                  desc: 'Your data stays on your device'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: 'Works Offline',
                  desc: 'No internet required'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  title: 'Supports 4+',
                  desc: 'Indian Languages'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                  title: 'Secure & Reliable',
                  desc: 'Built for citizens like you'
                }
              ].map(item => (
                <div key={item.title} className="flex flex-col items-start gap-1.5">
                  <div className="text-[#8B7355] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-[#0B251C]">{item.title}</span>
                  <span className="text-[10px] text-[#7A7873] leading-tight font-medium">{item.desc}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side Visual Block */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6">
            
            {/* The Connecting Line & Middle Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              {/* Central AI sparkles indicator circle */}
              <div className="w-10 h-10 rounded-full bg-[#0B251C] border-2 border-white shadow-md flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 w-full max-w-2xl relative">
              
              {/* Document Mockup Card */}
              <div className="card p-5 bg-white border border-[#EBEAE6] shadow-sm flex flex-col justify-between min-h-[360px] rounded-xl relative z-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F6F3] text-[10px] font-bold text-[#5A5853] mb-4">
                    Your Document
                  </div>
                  
                  {/* Scanned Gov Letter representation */}
                  <div className="space-y-3">
                    <div className="flex flex-col items-center border-b border-[#F0EFEA] pb-3 text-center">
                      <div className="w-6 h-6 rounded-full bg-[#FAF9F6] border border-[#D1CFCA] flex items-center justify-center mb-1 text-[8px] font-serif font-bold text-[#7A7873]">
                        म
                      </div>
                      <span className="text-[9px] font-bold tracking-tight text-[#0B251C] leading-none">महाराष्ट्र शासन</span>
                      <span className="text-[7px] text-[#7A7873] leading-none mt-0.5">कर आकारणी व करवसुली विभाग</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-[#FAF9F6] border border-[#EBEAE6] rounded w-full" />
                      <div className="h-1.5 bg-[#FAF9F6] border border-[#EBEAE6] rounded w-11/12" />
                      <div className="h-1.5 bg-[#FAF9F6] border border-[#EBEAE6] rounded w-4/5" />
                    </div>

                    {/* Simulating Table data */}
                    <div className="border border-[#EBEAE6] rounded-md overflow-hidden text-[7px] mt-2">
                      <div className="bg-[#FAF9F6] grid grid-cols-3 border-b border-[#EBEAE6] p-1 font-bold text-[#5A5853]">
                        <span>विवरण</span>
                        <span className="text-right">मागील थकबाकी</span>
                        <span className="text-right">चालू कर</span>
                      </div>
                      <div className="grid grid-cols-3 p-1 text-[#7A7873]">
                        <span>इमारत कर</span>
                        <span className="text-right">₹०</span>
                        <span className="text-right">₹१,२००</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR code and Barcode block */}
                <div className="flex justify-between items-end border-t border-[#F0EFEA] pt-3">
                  <div className="space-y-1">
                    <div className="h-1.5 bg-[#EBEAE6] rounded w-16" />
                    <div className="h-1 bg-[#EBEAE6] rounded w-12" />
                  </div>
                  {/* Mock QR */}
                  <div className="w-8 h-8 bg-[#FAF9F6] border border-[#D1CFCA] p-0.5 flex flex-wrap gap-0.5 rounded">
                    {[1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1].map((dot, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-xs ${dot ? 'bg-[#0B251C]' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Explained cards list */}
              <div className="card p-5 bg-white border border-[#EBEAE6] shadow-sm flex flex-col gap-3.5 min-h-[360px] rounded-xl relative z-0 justify-center">
                
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F0E5] text-[11px] font-bold text-[#3D7C47]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Explained by Samajh AI
                </div>

                {/* Amount Due Card */}
                <div className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-[#EBEAE6] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#EBEAE6] text-[#0B251C] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="12" y1="18" x2="12" y2="6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A7873] uppercase tracking-wider font-bold">Amount Due</p>
                    <p className="text-base font-bold text-[#0B251C] tracking-tight">₹1,200</p>
                  </div>
                </div>

                {/* Pay Before Card */}
                <div className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-[#EBEAE6] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#EBEAE6] text-[#0B251C] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A7873] uppercase tracking-wider font-bold">Pay Before</p>
                    <p className="text-[13px] font-bold text-[#0B251C]">15 June 2024</p>
                  </div>
                </div>

                {/* Risk Level Card */}
                <div className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-[#EBEAE6] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#EBEAE6] text-[#3D7C47] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A7873] uppercase tracking-wider font-bold">Risk Level</p>
                    <p className="text-[13px] font-bold text-[#3D7C47]">Low</p>
                  </div>
                </div>

                {/* What You Should Do Card */}
                <div className="flex items-start gap-3 p-3 bg-[#FAF9F6] border border-[#EBEAE6] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#EBEAE6] text-[#0B251C] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A7873] uppercase tracking-wider font-bold">What You Should Do</p>
                    <p className="text-[11px] leading-snug font-bold text-[#0B251C] mt-0.5">Pay the amount on time to avoid late fees.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
