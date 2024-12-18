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
import { LanguagesIcon } from 'lucide-react'
import { Button } from './ui/button'

export default function LocaleSelect() {
  const locale = useLocale()
  const t = useTranslations('Index')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' aria-label='Select Language'>
          <LanguagesIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-32'>
        {['en', 'zh-Hans'].map((lang) => (
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
