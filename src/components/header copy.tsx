'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { GridBackground } from '@/components/gird-background'
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
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="relative container mx-auto flex size-full h-14 flex-row items-center px-4 sm:px-6 lg:px-8">
        <GridBackground />

        <nav className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              Starllow Lab
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`transition-colors ${
                  isActive('/blog') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/showcase"
                className={`transition-colors ${
                  isActive('/showcase') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Showcase
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link
                href="/"
                className={`block px-3 py-2 transition-colors ${
                  isActive('/') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/blog"
                className={`block px-3 py-2 transition-colors ${
                  isActive('/blog') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                博客
              </Link>
              <Link
                href="/showcase"
                className={`block px-3 py-2 transition-colors ${
                  isActive('/showcase') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Showcase
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
