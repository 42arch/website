import Link from 'next/link'
import React from 'react'
import ThemeToogle from './ThemeToogle'

const NavItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="px-1 sm:px-4 font-medium cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
      {title}
    </Link>
  )
}

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <nav>
        <Link href={'/'} className="uppercase">
          42Arch
        </Link>
      </nav>
      <div className="flex items-center text-base leading-4">
        <div className="hidden sm:block">
          <NavItem href="/blog" title="Blog" />
          <NavItem href="/project" title="Project" />
          <NavItem href="/about" title="About" />
        </div>
        <div className="rounded px-1 sm:px-4 flex items-center justify-center">
          <ThemeToogle />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
