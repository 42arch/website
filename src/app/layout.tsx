import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { getNotesList } from '@/components/apps/notes/data'
import { Shell } from '@/components/shell/shell'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'
import 'katex/dist/katex.css'
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
  title: 'Starllow.OS',
  description: 'Starllow.OS',
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
