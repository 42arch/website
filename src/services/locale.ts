'use server'

import type { Locale } from '../i18n/config'
import { cookies } from 'next/headers'
import { defaultLocale, locales } from '../i18n/config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const val = cookieStore.get(COOKIE_NAME)?.value

  if (!val)
    return defaultLocale

  // Exact match (e.g., 'en', 'zh')
  if (locales.includes(val as Locale)) {
    return val as Locale
  }

  // Prefix match (e.g. 'zh-CN' or 'zh-TW' -> 'zh', 'en-US' -> 'en')
  const prefix = val.split('-')[0] as Locale
  if (locales.includes(prefix)) {
    return prefix
  }

  return defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  })
}
