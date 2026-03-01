'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { PixelIcon } from '@/components/pixel-icon'
import { Card, CardContent } from '@/components/ui/card'

const contacts = [
  {
    key: 'email',
    href: 'mailto:rend42@163.com',
    icon: 'at',
    hoverClass: 'hover:text-[var(--pixel-yellow)]',
  },
  {
    key: 'github',
    href: 'https://github.com/42arch',
    icon: 'github',
    hoverClass: 'hover:text-[var(--pixel-cyan)]',
  },
  {
    key: 'stackblitz',
    href: 'https://stackblitz.com/@42arch',
    icon: 'code-block',
    hoverClass: 'hover:text-[var(--pixel-green)]',
  },
  {
    key: 'x',
    href: 'https://x.com/42archy',
    icon: 'x',
    hoverClass: 'hover:text-[var(--pixel-magenta)]',
  },
  {
    key: 'bilibili',
    href: 'https://space.bilibili.com/22589532',
    icon: 'play',
    hoverClass: 'hover:text-[var(--pixel-cyan)]',
  },
] as const

export function HomeContact() {
  const t = useTranslations('HomeContact')

  return (
    <section className="mx-auto mt-8 w-full max-w-3xl pb-10">
      <Card className="bg-[var(--pixel-panel)]">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-2">
            <PixelIcon name="link" className="text-[var(--pixel-cyan)]" />
            <h3 className="text-xs text-[var(--pixel-cyan)] md:text-sm">{t('title')}</h3>
          </div>

          <p className="pixel-copy">{t('description')}</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {contacts.map(contact => (
              <Link
                key={contact.key}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 border-2 border-[var(--pixel-border)] bg-[var(--pixel-card)] px-3 py-2 text-[10px] text-[var(--muted-foreground)] transition-colors ${contact.hoverClass}`}
              >
                <PixelIcon name={contact.icon} size={13} />
                <span>{t(contact.key)}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
