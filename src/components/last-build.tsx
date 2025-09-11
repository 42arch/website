import { formatDistanceToNow } from 'date-fns'
import getConfig from 'next/config'

export default function LastBuild() {
  const { publicRuntimeConfig } = getConfig()

  const buildTime = new Date(Number(publicRuntimeConfig.buildTime))

  const buildTimeAgo = formatDistanceToNow(buildTime, {
    addSuffix: true,
  })

  return (
    <p className="truncate text-xs text-muted-foreground">
      Last build:
      {' '}
      {buildTimeAgo}
      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-400" />
    </p>
  )
}
