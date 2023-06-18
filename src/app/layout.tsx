'use client'

import { Inter as FontSans } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import cn from 'classnames'
import { Provider } from 'react-wrap-balancer'
import { AnalyticsWrapper } from '@/components/analytics'
import '@/styles/globals.css'
import '@/styles/mdx.css'

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
          'min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50',
          fontSans.className
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>{children}</Provider>
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
