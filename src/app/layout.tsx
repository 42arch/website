import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { DesktopStateProvider } from '@/components/desktop/desktop-state-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import './globals.css'

const geistSans = localFont({
  src: '../../public/fonts/Geist-Variable.woff2',
  variable: '--font-sans',
})

const geistMono = localFont({
  src: '../../public/fonts/GeistMono-Variable.woff2',
  variable: '--font-geist-mono',
})

const geistHeading = localFont({
  src: '../../public/fonts/Geist-Variable.woff2',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Starllow — Dan 的数字自留地',
  description: '欢迎来到 Dan 的个人桌面。探索 Web3D、地图可视化、开源项目与学习笔记。',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, geistHeading.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DesktopStateProvider>{children}</DesktopStateProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
