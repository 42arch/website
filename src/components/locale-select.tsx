'use client'

import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'
import { useLocale, useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button'

export default function LocaleSelect() {
  const locale = useLocale()
  const t = useTranslations('index')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' aria-label='Select Language'>
          <span className='i-lucide-languages h-5 w-5'></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-32'>
        {['en', 'zh-CN'].map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => {
              if (lang !== locale) {
                setUserLocale(lang as Locale)
              }
            }}
          >
            {t(`locales.${lang}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
