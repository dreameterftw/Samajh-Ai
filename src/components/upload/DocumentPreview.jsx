export default function DocumentPreview({ image, fileName }) {
  if (!image) return null

  return (
    <div className="card p-4">
      <p className="text-caption text-[var(--text-secondary)] mb-3">
        {fileName ?? 'Document preview'}
      </p>
      <div className="rounded-[20px] overflow-hidden bg-gray-100 max-h-80">
        <img src={image} alt="Document preview" className="w-full h-full object-contain" />
      </div>
    </div>
  )
}
