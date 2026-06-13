export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

export function getRiskLevel(redFlags, actions) {
  if (redFlags?.length > 0) return 'urgent'
  const hasHighUrgency = actions?.some(a => a.urgency === 'high')
  if (hasHighUrgency) return 'attention'
  return 'safe'
}

export function getRiskLabel(level) {
  const labels = {
    safe: 'Safe',
    attention: 'Attention Needed',
    urgent: 'Urgent',
  }
  return labels[level] ?? 'Safe'
}

export function getStatusClass(level) {
  const classes = {
    safe: 'status-safe',
    attention: 'status-warn',
    urgent: 'status-urgent',
  }
  return classes[level] ?? 'status-safe'
}
