export type Locale = (typeof locales)[number]

export const locales = ['en', 'zh-CN'] as const
export const defaultLocale: Locale = 'en'

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
