import { motion } from 'framer-motion'
import Card from '../common/Card'

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Complex Documents',
    description: 'Break down legal jargon into plain language'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Hidden Risks',
    description: 'Detect important warnings and urgent deadlines'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: 'Action Steps',
    description: 'Get clear steps on what you need to do'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Multiple Languages',
    description: 'Read and listen in your preferred language'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-[#F7F6F3]">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="font-serif text-[32px] font-bold text-[#0B251C] mb-12">
          We help you understand
        </h2>

        {/* Features list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full flex items-start text-left bg-white border border-[#EBEAE6] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-4">
                
                {/* Icon box */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  feature.title === 'Hidden Risks' 
                    ? 'bg-[#FEE2E2] text-[#B94A48]' 
                    : feature.title === 'Action Steps'
                    ? 'bg-[#E8F0E5] text-[#3D7C47]'
                    : feature.title === 'Multiple Languages'
                    ? 'bg-[#FEF3C7] text-[#B8860B]'
                    : 'bg-[#FAF9F6] text-[#0B251C] border border-[#EBEAE6]'
                }`}>
                  {feature.icon}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-sans text-[14px] font-bold text-[#0B251C]">
                    {feature.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-[#5A5853]">
                    {feature.description}
                  </p>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
