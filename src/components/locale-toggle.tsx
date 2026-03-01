'use client'

import type { AppLocale } from '@/i18n/config'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { defaultLocale, resolveLocale } from '@/i18n/config'

const localeOptions = [
  { value: 'en', labelKey: 'en' },
  { value: 'zh-CN', labelKey: 'zhCN' },
] as const

function setLocaleCookie(locale: AppLocale) {
  const oneYear = 60 * 60 * 24 * 365
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${oneYear}; samesite=lax`
}

export function LocaleToggle() {
  const locale = resolveLocale(useLocale())
  const router = useRouter()
  const t = useTranslations('LocaleToggle')

  const currentLabel = localeOptions.find(option => option.value === locale)?.labelKey ?? defaultLocale

  return (
    <div className="flex flex-col items-end gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="sm" variant="ghost">
            {t('trigger')}
            :
            {' '}
            {t(currentLabel)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('choose')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {localeOptions.map(option => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(event) => {
                event.preventDefault()
                const nextLocale = option.value
                if (nextLocale === locale)
                  return

                setLocaleCookie(nextLocale)
                router.refresh()
              }}
            >
              <span className="w-3 text-[var(--pixel-yellow)]" aria-hidden>
                {locale === option.value ? '▶' : ''}
              </span>
              <span>{t(option.labelKey)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="text-[8px] text-[var(--muted-foreground)]">
        {t('active')}
        :
        {' '}
        {t(currentLabel)}
      </p>
    </div>
  )
}
