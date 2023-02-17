'use client'

import { Inter as FontSans } from '@next/font/google'
import SiteHeader from '@/components/SiteHeader'
import { ThemeProvider } from 'next-themes'
import cn from 'classnames'
import '@/styles/globals.css'
import '@/styles/markdown.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={cn(
          'min-h-screen bg-white font-sans text-slate antialiased dark:bg-slate-900 dark:text-white',
          fontSans.className
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
