'use client'

import { Inter as FontSans } from '@next/font/google'
import SiteHeader from '@/components/SiteHeader'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import cn from 'classnames'

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
          'min-h-screen bg-white font-sans text-black antialiased dark:bg-gray-900 dark:text-white',
          fontSans.className
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
