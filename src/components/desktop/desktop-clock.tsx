'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

export function DesktopClock() {
  const locale = useLocale()
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])
  return <time className="whitespace-nowrap text-[11px] tabular-nums max-[700px]:text-[9px] max-[420px]:hidden" dateTime={now?.toISOString()}>{now ? new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(now) : locale === 'zh' ? '欢迎来到 Starllow' : 'Welcome to Starllow'}</time>
}
