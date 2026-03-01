'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/')
    return pathname === '/'

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="pixel-shell">
      <header className="pixel-panel pixel-header mb-8 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] text-[var(--pixel-accent)]">PIXEL ADVENTURER v1.0</p>
          <nav className="flex flex-wrap gap-2 text-[10px]">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pixel-nav-link ${active ? 'pixel-nav-link-active' : ''}`}
                >
                  <span className="w-3 text-[var(--pixel-accent)]" aria-hidden>
                    {active ? '▶' : ''}
                  </span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="reveal">{children}</main>

      <footer className="mt-8 text-center text-[9px] text-[#7fa68b]">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        Pixel Adventurer. Quest log never ends.
      </footer>
    </div>
  )
}
