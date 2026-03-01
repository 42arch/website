export const locales = ['en', 'zh-CN'] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'en'

export function isValidLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale)
}

export function resolveLocale(locale?: string): AppLocale {
  if (locale && isValidLocale(locale))
    return locale

  return defaultLocale
}
