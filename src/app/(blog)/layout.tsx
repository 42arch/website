import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import ThemeSwitch from '@/components/theme-switch'
import nextIcon from '../../../public/thirteen.svg'
import MobileMenu from '@/components/mobile-menu'

interface MenuItem {
  href: string
  title: string
}

export default async function BlogLayout({
  children
}: {
  children: ReactNode
}) {
  const menuItems: MenuItem[] = [
    {
      href: '/post',
      title: 'Post'
    },
    {
      href: '/guestbook',
      title: 'Guestbook'
    },
    {
      href: '/project',
      title: 'Project'
    }
  ]

  return (
    <div className="flex flex-col px-4 md:px-10 lg:px-16">
      <header className="sticky top-0 z-50 h-20 pt-6 pb-2 bg-light dark:bg-dark flex justify-between items-center">
        <Link href="/">
          <Image priority src={nextIcon} alt="" />
        </Link>
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden sm:flex sm:gap-6">
            {menuItems.map((i) => (
              <Link
                key={i.title}
                href={i.href}
                className="text-lg hover:text-primary hover:opacity-80 duration-300">
                {i.title}
              </Link>
            ))}
          </div>
          <MobileMenu items={menuItems} />
          <ThemeSwitch />
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  )
}