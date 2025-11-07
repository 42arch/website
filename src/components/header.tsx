'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/')
      return true
    if (path !== '/' && pathname.startsWith(path))
      return true
    return false
  }

  return (
    <>
      <div className="relative px-4 lg:px-6 container mx-auto backdrop-blur-lg transition-colors flex size-full h-16 flex-row items-center">
        <nav className="relative mx-auto grid h-full grid-cols-4 grid-rows-1 items-center size-full">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-medium text-primary hover:text-primary/80 transition-colors">
              Starllow
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8 text-sm">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`transition-colors ${
                  isActive('/blog') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/showcase"
                className={`transition-colors ${
                  isActive('/showcase') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Showcase
              </Link>
            </div>
          </div>

          <div className="block md:hidden"></div>

          <div></div>

          <div className="hidden md:flex items-center space-x-4 justify-self-end">
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2 justify-self-end">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/80 backdrop-blur-lg box-content z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-b border-main">
            <Link
              href="/"
              className={`block px-3 py-2 ${
                isActive('/') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`block px-3 py-2 ${
                isActive('/blog') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/showcase"
              className={`block px-3 py-2  ${
                isActive('/showcase') ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Showcase
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
