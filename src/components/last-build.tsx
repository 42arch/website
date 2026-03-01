'use client'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function formatRelativeBuildTime(timestamp: number) {
  const diff = Date.now() - timestamp
  if (diff < MINUTE)
    return 'just now'

  if (diff < HOUR)
    return `${Math.floor(diff / MINUTE)}m ago`

  if (diff < DAY)
    return `${Math.floor(diff / HOUR)}h ago`

  return `${Math.floor(diff / DAY)}d ago`
}

interface LastBuildProps {
  buildTime?: number
  label?: string
}

export function LastBuild({ buildTime, label = 'Last build' }: LastBuildProps) {
  const parsedBuildTime = typeof buildTime === 'number' ? buildTime : Number.NaN

  if (Number.isNaN(parsedBuildTime)) {
    return <p className="text-[9px] text-[var(--muted-foreground)]">{`${label}: unknown`}</p>
  }

  return (
    <p className="truncate text-[9px] text-[var(--muted-foreground)]">
      {label}
      {': '}
      {formatRelativeBuildTime(parsedBuildTime)}
      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-400" />
    </p>
  )
}
