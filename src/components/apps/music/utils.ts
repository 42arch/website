export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0)
    return '0:00'

  const wholeSeconds = Math.floor(seconds)
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`
}
