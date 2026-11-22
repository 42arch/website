import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { getNotesList } from '@/components/apps/notes/data'
import { LocaleProvider } from '@/components/locale-provider'
import { PwaRegister } from '@/components/pwa-register'
import { JsonLd } from '@/components/seo/json-ld'
import { Shell } from '@/components/shell/shell'
import { ThemeProvider } from '@/components/theme-provider'
import { defaultLocale } from '@/i18n/config'
import { siteDescription, siteName, siteUrl } from '@/lib/site'
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'Starllow', url: siteUrl }],
  creator: 'Starllow',
  keywords: ['Starllow', '图形学', 'WebGL', '工程实践', '技术博客'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: 'summary',
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/pwa/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/pwa/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/pwa/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#eae6da',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const notesList = getNotesList()
  const virtualFiles = getVirtualFileSystem(notesList)

  return (
    <html
      lang={defaultLocale}
      className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, geistHeading.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': siteName,
            'url': siteUrl,
            'description': siteDescription,
            'inLanguage': 'zh-CN',
            'author': {
              '@type': 'Person',
              'name': 'Starllow',
              'url': siteUrl,
            },
          }}
        />
        <PwaRegister />
        <Script
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id="baa5bf4e-bb03-4100-aa40-c0e68c7f806c"
        />
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Shell notesList={notesList} virtualFiles={virtualFiles}>{children}</Shell>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
