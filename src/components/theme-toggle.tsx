'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const themeOptions = [
  { value: 'light', key: 'light' },
  { value: 'dark', key: 'dark' },
  { value: 'system', key: 'system' },
] as const

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('ThemeToggle')

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLabel = useMemo(() => {
    if (!theme)
      return 'system'

    return themeOptions.find(option => option.value === theme)?.key ?? 'system'
  }, [theme])

  if (!mounted)
    return <div className="h-8 w-[154px]" />

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
          {themeOptions.map(option => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(event) => {
                event.preventDefault()
                setTheme(option.value)
              }}
            >
              <span className="w-3 text-[var(--pixel-yellow)]" aria-hidden>
                {theme === option.value ? '▶' : ''}
              </span>
              <span>{t(option.key)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="text-[8px] text-[var(--muted-foreground)]">
        {t('active')}
        :
        {' '}
        {theme === 'system'
          ? `${t('system')} (${resolvedTheme ? t(resolvedTheme) : t('light')})`
          : theme ? t(theme) : t('system')}
      </p>
    </div>
  )
}
