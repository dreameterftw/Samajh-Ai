import { motion } from 'framer-motion'
import { SUPPORTED_DOCS } from '../../data/supportedDocs'

export default function SupportedDocuments() {
  return (
    <section id="supported-documents" className="py-20 px-6 bg-white border-b border-[#EBEAE6]">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="font-serif text-[32px] font-bold text-[#0B251C] mb-3">
          Supported Documents
        </h2>
        <p className="text-[15px] text-[#5A5853] mb-12 max-w-xl mx-auto">
          From utility bills to legal notices — we translate the documents that matter most to you
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {SUPPORTED_DOCS.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="card p-6 bg-[#FAF9F6] border border-[#EBEAE6] hover:shadow-md transition-shadow duration-300 flex flex-col justify-between rounded-xl text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#EBEAE6] flex items-center justify-center text-xl shadow-sm mb-4">
                  {doc.icon}
                </div>
                <h3 className="font-serif text-[16px] font-bold text-[#0B251C]">
                  {doc.name}
                </h3>
                <p className="text-[12px] leading-relaxed text-[#5A5853] mt-2">
                  {doc.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
