import { format, formatDistanceToNow } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'

const locales = {
  'en': enUS,
  'zh-CN': zhCN,
}

export function formatDate(date: Date | string | number, locale: string = 'en', formatStr: string = 'PP') {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const localeObj = locales[locale as keyof typeof locales] || enUS

  return format(dateObj, formatStr, { locale: localeObj })
}

export function formatRelativeTime(date: Date | string | number, locale: string = 'en') {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const localeObj = locales[locale as keyof typeof locales] || enUS

  return formatDistanceToNow(dateObj, {
    locale: localeObj,
    addSuffix: true,
  })
}
