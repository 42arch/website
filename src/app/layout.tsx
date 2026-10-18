import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import Script from 'next/script'
import { getNotesList } from '@/components/apps/notes/data'
import { PwaRegister } from '@/components/pwa-register'
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
  applicationName: 'Starllow.OS',
  appleWebApp: {
    capable: true,
    title: 'Starllow.OS',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#eae6da',
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
        <PwaRegister />
        <Script
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id="baa5bf4e-bb03-4100-aa40-c0e68c7f806c"
        />
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
