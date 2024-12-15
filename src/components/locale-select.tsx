'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSelect() {
  const locale = useLocale()
  const t = useTranslations('Index')

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        const locale = value as Locale
        setUserLocale(locale)
      }}
    >
      <SelectTrigger id='language' className='w-[120px] font-sans'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        {['en', 'zh-Hans'].map((lang) => (
          <SelectItem key={lang} value={lang}>
            {t(`locales.${lang}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
