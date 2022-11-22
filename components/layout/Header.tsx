import React, { FC } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import MobileMenu from './MobileMenu'
import ThemeChanger from './ThemeChanger'
import s from './Header.module.css'

const NavItem: FC<{ href: string; text: string }> = ({ href, text }) => {
  const router = useRouter()
  const isAcitve = router.asPath === href

  return (
    <NextLink
      href={href}
      className={cn(
        s.hover_bottom,
        isAcitve ? 'text-th-text-h font-bold' : 'text-th-text',
        'hidden md:inline-block py-1 px-3'
      )}>
      {text}
    </NextLink>
  )
}

const Header = () => {
  return (
    <header className="bg-th-bg sticky border-b-2 border-th-mark top-0 z-20 flex flex-col justify-center px-4">
      <nav className="flex items-center justify-between w-full py-4 md:py-6">
        <div className="flex items-center">
          <div className="font-extrabold">
            <span className="font-bold text-lg">MAINISSUES.CC</span>
          </div>
          <div className="px-8">
            <NavItem href="/" text="Home" />
            <NavItem href="/project" text="Project" />
            <NavItem href="/post" text="Post" />
            <NavItem href="/about" text="About" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ThemeChanger />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
