import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { PixelLayout } from '@/components/pixel-layout'
import { ThemeProvider } from '@/components/theme-provider'
import 'katex/dist/katex.min.css'
import './globals.css'

const zpix = localFont({
  src: '../../public/fonts/zpix.ttf',
  display: 'swap',
  variable: '--font-zpix',
})

export const metadata: Metadata = {
  title: 'Starllow Lab',
  description: 'starllow.com - Pixel laboratory of 42arch.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={zpix.variable}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <PixelLayout>{children}</PixelLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={gaId || ''} />
      </body>
    </html>
  )
}
