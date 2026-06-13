export default function TrustSection() {
  return (
    <section className="bg-[#FAF9F6] border-y border-[#EBEAE6] py-4.5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left text-[#5A5853] text-[13px] font-semibold">
        
        {/* Core Tag */}
        <div className="flex items-center gap-2 text-[#0B251C]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#8B7355]">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Built for real people dealing with real paperwork</span>
        </div>

        {/* Divider */}
        <span className="hidden md:inline text-[#D1CFCA]">|</span>

        {/* bullet points */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#5A5853] text-[12px] font-medium">
          <span>No sign-up required</span>
          <span className="text-[#D1CFCA]">•</span>
          <span>No data leaves your device</span>
          <span className="text-[#D1CFCA]">•</span>
          <span>Completely private</span>
        </div>

      </div>
    </section>
  )
}
