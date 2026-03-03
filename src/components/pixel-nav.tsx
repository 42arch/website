'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
] as const

function getActive(pathname: string, href: string) {
  if (href === '/')
    return pathname === '/'

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PixelNav() {
  const pathname = usePathname()
  const t = useTranslations('Nav')

  return (
    <header className="pixel-nav-shell sticky top-0 z-50 border-b-4 border-[var(--pixel-border-highlight)] bg-[var(--nav-bg)]">
      <nav className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:gap-1">
          <Link href="/" className="text-[13px] text-pixel-green transition-colors hover:text-[var(--pixel-yellow)]">
            {'<'}
            STARLLOW
            {'/>'}
          </Link>
          <span className="text-[9px] text-[var(--muted-foreground)]">{t('subtitle')}</span>
        </div>

        <ul className="flex flex-wrap items-center gap-3 md:gap-5">
          {navItems.map((item) => {
            const active = getActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    active
                      ? 'text-[var(--pixel-yellow)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <span className="w-3 text-[12px]" aria-hidden>{active ? '▶' : ''}</span>
                  {t(item.key)}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
