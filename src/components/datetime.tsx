'use client'

import { useLocale } from 'next-intl'
import { zhCN, enUS } from 'date-fns/locale'
import { format } from 'date-fns'

type Props = {
  time: string | Date
  className?: string
}

export default function Datetime({ time, className }: Props) {
  const locale = useLocale()
  const localDatetime = format(new Date(time), 'PPPP', {
    locale: locale === 'zh-CN' ? zhCN : enUS
  })

  return <time className={className}>{localDatetime}</time>
}
