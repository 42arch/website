'use server'

import { cookies } from 'next/headers'
import { defaultLocale, Locale, LOCALE_COOKIE_NAME } from '@/i18n/config'

export async function getUserLocale() {
  return cookies().get(LOCALE_COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(LOCALE_COOKIE_NAME, locale)
}
