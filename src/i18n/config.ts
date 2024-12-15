export type Locale = (typeof locales)[number]

export const locales = ['en', 'zh-Hans'] as const
export const defaultLocale: Locale = 'zh-Hans'

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
