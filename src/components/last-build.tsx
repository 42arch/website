'use client'

import { formatRelativeTime } from '@/lib/date-utils'
import { useLocale, useTranslations } from 'next-intl'

interface LastBuildProps {
  label?: string
}

export function LastBuild({ label }: LastBuildProps) {
  const t = useTranslations('Footer')
  const locale = useLocale()
  const displayLabel = label || t('lastBuild')

  // eslint-disable-next-line node/prefer-global/process
  const rawBuildTime = process.env.NEXT_PUBLIC_BUILD_TIME

  const buildTime = rawBuildTime ? Number(rawBuildTime) : Number.NaN
  const parsedBuildTime = typeof buildTime === 'number' ? buildTime : Number.NaN

  if (Number.isNaN(parsedBuildTime)) {
    return <p className="text-[9px] text-muted-foreground">{`${displayLabel}: ${t('unknown')}`}</p>
  }

  return (
    <p className="truncate text-[9px] text-muted-foreground">
      {displayLabel}
      {': '}
      {formatRelativeTime(parsedBuildTime, locale)}
      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-400" />
    </p>
  )
}
