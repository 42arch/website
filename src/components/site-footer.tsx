'use client'

import { useLocale, useTranslations } from 'next-intl'
import { formatDistanceToNow } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import Link from 'next/link'

export default function SiteFooter() {
  const locale = useLocale()
  const t = useTranslations('info')

  const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIME as string)
  const buildTimeAgo = formatDistanceToNow(buildTime, {
    addSuffix: true,
    locale: locale === 'zh-CN' ? zhCN : enUS
  })

  return (
    <footer className='relative z-10 mx-6 mt-4 bg-background py-4 text-center text-xs text-muted-foreground md:mx-12 lg:mx-24'>
      <div className='mx-auto flex max-w-4xl flex-col px-4 md:flex-row md:justify-between md:px-12 lg:px-24 '>
        <div className='flex flex-col gap-1'>
          <p className='truncate'>
            {t('last-build')}: {buildTimeAgo}
            <span className='ml-1 inline-block h-2 w-2 rounded-full bg-green-400' />
          </p>
          <p className='flex flex-row justify-center gap-3 truncate'>
            <Link
              href='/about'
              className='flex cursor-pointer items-center underline-offset-2 hover:text-foreground hover:underline'
            >
              <span className=''>{t('about')}</span>
            </Link>
            <a
              className='flex cursor-pointer items-center underline-offset-2 hover:text-foreground hover:underline'
              href='https://dashboard.openpanel.dev/share/overview/a571gO'
              target='_blank'
              rel='noreferrer'
            >
              <span>{t('track')}</span>
            </a>
            <Link
              href='/sitemap.xml'
              className='flex cursor-pointer items-center underline-offset-2 hover:text-foreground hover:underline'
            >
              <span>{t('sitemap')}</span>
            </Link>
            <Link
              href='/feed.xml'
              className='flex cursor-pointer items-center underline-offset-2 hover:text-foreground hover:underline'
            >
              <span>{t('rss')}</span>
            </Link>
          </p>
        </div>
        <div className='mt-2 md:mt-0'>
          <p>
            <a
              className='text-xs hover:text-foreground'
              href='https://icp.gov.moe/?keyword=20254242'
              target='_blank'
              rel='noreferrer'
            >
              萌ICP备20254242号
            </a>
          </p>
          <p className='mt-1'>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
