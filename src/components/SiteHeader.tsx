import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import ThemeToogle from './ThemeToogle'

const NavItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="px-2 sm:px-4 font-medium cursor-pointer hover:text-primary-400 dark:text-gray-200 dark:hover:text-primary-400">
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
    <header className="flex items-center justify-between py-10">
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
    </header>
  )
}

export default SiteHeader
