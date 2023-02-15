import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import ThemeToogle from './ThemeToogle'

const NavItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="px-2 sm:px-4 font-medium cursor-pointer text-slate-600 hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-400">
      {title}
    </Link>
  )
}

const SiteHeader = () => {
  const navItems = [
    {
      href: '/blog',
      title: 'Blog'
    },
    {
      href: '/project',
      title: 'Project'
    },
    {
      href: '/about',
      title: 'About'
    }
  ]

  return (
    <header className="container sticky top-0 z-40 bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 dark:border-b-slate-800 py-4">
        <nav>
          <Link href={'/'} className="uppercase">
            42Arch
          </Link>
        </nav>
        <div className="flex items-center text-base leading-4">
          <div className="hidden sm:block">
            {navItems.map((i) => (
              <NavItem key={i.title} href={i.href} title={i.title} />
            ))}
          </div>
          <div className="rounded px-1 sm:px-4 flex items-center justify-center">
            <ThemeToogle />
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
