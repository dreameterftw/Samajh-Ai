export default function ProcessingAnimation() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 ai-orb" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-40 ai-orb" style={{ animationDirection: 'reverse', animationDuration: '6s' }} />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-indigo-700 flex items-center justify-center text-white text-2xl pulse-soft">
        🤖
      </div>
    </div>
  )
}
