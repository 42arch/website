import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import 'katex/dist/katex.css'
import { Shell } from '@/components/shell/shell'
import { ThemeProvider } from '@/components/theme-provider'
import { getNotesList } from '@/lib/notes-data'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'
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
  title: 'Starllow.OS — macOS × PostHog 磨砂质感个人数字工作台',
  description: 'Starllow.OS — 融合 macOS 窗口操作系统与 PostHog 极客美学的个人数字工作台，搭载 8 套专属应用与暖石磨砂材质系统。',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  const notesList = getNotesList()
  const virtualFiles = getVirtualFileSystem(notesList)

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
            defaultTheme="light"
            disableTransitionOnChange
          >
          <Shell notesList={notesList} virtualFiles={virtualFiles}>{children}</Shell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
