import React, { FC, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import cn from 'classnames'
import Link from 'next/link'

interface IProps {
  navItems: { href: string; title: string }[]
}

const MobileNav: FC<IProps> = ({ navItems }) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden text-lg">
      <button
        type="button"
        className="flex"
        aria-label="Toggle Menu"
        onClick={onToggleNav}>
        <FiMenu className="m-1 cursor-pointer nav-link" />
      </button>
      <div
        className={cn(
          'fixed top-0 left-0 z-10 h-full w-full transform bg-slate-200 opacity-95 duration-300 ease-in-out dark:bg-slate-800',
          navShow ? 'translate-x-0' : 'translate-x-full'
        )}>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-7 mt-5 rounded flex"
            aria-label="Toggle Menu"
            onClick={onToggleNav}>
            <FiX className="m-1 cursor-pointer nav-link" />
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {navItems.map((i) => (
            <div key={i.title} className="px-12 py-4">
              <Link
                href={i.href}
                className="text-2xl tracking-widest nav-link"
                onClick={onToggleNav}>
                {i.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
