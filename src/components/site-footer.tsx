'use client'

import { formatDistanceToNow } from 'date-fns'
import { useTranslations } from 'next-intl'

export default function SiteFooter() {
  const t = useTranslations('info')

  const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIME as string)
  const buildTimeAgo = formatDistanceToNow(buildTime, { addSuffix: true })

  return (
    <footer className='relative z-10 h-16 bg-background px-6 text-center text-sm text-accent-foreground md:px-10 lg:px-16'>
      <p className='truncate'>
        {t('last-build')}: {buildTimeAgo}
        <span className='ml-1 inline-block h-2 w-2 rounded-full bg-green-400' />
      </p>
    </footer>
  )
}
