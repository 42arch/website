import type { Locale } from '@/i18n/config'
import { defaultLocale, locales } from '@/i18n/config'

const STORAGE_KEY = 'NEXT_LOCALE'

export function readStoredLocale(): Locale {
  if (typeof window === 'undefined')
    return defaultLocale

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && locales.includes(stored as Locale))
    return stored as Locale

  return defaultLocale
}

export function saveStoredLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale)
}
