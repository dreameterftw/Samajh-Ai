import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../common/Card'

export default function UploadCard() {
  return (
    <Link to="/upload">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="h-full cursor-pointer group">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-section-title text-[var(--text)] mb-2">Upload Document</h3>
          <p className="text-body text-[var(--text-secondary)]">
            Analyze PDF, JPG or PNG
          </p>
        </Card>
      </motion.div>
    </Link>
  )
}
