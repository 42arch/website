'use client'

import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/config'
import { NextIntlClientProvider } from 'next-intl'
import { useEffect, useState } from 'react'
import { defaultLocale, timeZone } from '@/i18n/config'
import { readStoredLocale } from '@/services/locale'
import en from '../../messages/en.json'
import zh from '../../messages/zh.json'

const catalogs = { en, zh }

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = readStoredLocale()
    setLocale(stored)
    document.documentElement.lang = stored
  }, [])

  return (
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
