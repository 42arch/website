import Link from 'next/link'
import React from 'react'
import ThemeToogle from './ThemeToogle'

const NavItem = ({ href, title }: { href: string; title: string }) => {
  return <Link href={href}>{title}</Link>
}

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <nav>
        <Link href={'/'} className="uppercase">
          42Arch
        </Link>
      </nav>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          <NavItem href="/blog" title="blog" />
        </div>
        <div className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4">
          <ThemeToogle />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
