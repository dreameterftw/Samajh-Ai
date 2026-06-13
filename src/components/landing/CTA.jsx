import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="about-us" className="py-16 px-6 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto bg-[#FAF9F6] border border-[#EBEAE6] p-8 md:p-10 rounded-2xl shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left: Privacy Priority */}
          <div className="flex items-start gap-5">
            {/* Shield/Lock Graphic */}
            <div className="w-14 h-14 rounded-full bg-[#E8F0E5] text-[#3D7C47] flex items-center justify-center flex-shrink-0 shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-serif text-[18px] font-bold text-[#0B251C]">
                Your privacy is our priority
              </h3>
              <p className="text-[13px] leading-relaxed text-[#5A5853]">
                Samajh AI works completely offline. Your documents never leave your device or get uploaded or shared. What you see is only for you.
              </p>
            </div>
          </div>

          {/* Right: CTA Start Now */}
          <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-[#EBEAE6] pt-6 md:pt-0 md:pl-12 w-full">
            <div className="space-y-1">
              <h3 className="font-serif text-[18px] font-bold text-[#0B251C]">
                Ready to understand your documents?
              </h3>
              <p className="text-[13px] text-[#5A5853]">
                Start now — it's free and instant.
              </p>
            </div>

            {/* Circular Arrow Button */}
            <Link 
              to="/dashboard" 
              className="w-12 h-12 rounded-full bg-[#0B251C] hover:bg-[#153a2d] text-white flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.33 8h9.34M8.67 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
