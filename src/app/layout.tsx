import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { WorkspaceShell } from '@/components/workspace/workspace-shell'
import { author, site, social } from '@/config'
import { cn } from '@/lib/utils'

import './globals.css'

const geistHeading = localFont({
  src: [
    {
      path: '../../public/fonts/geist-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
})

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
})

const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/geist-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
})

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/geist-mono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
})

const titleText = `${site.name} — Developer Workspace`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titleText,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: author.name, url: site.url }],
  creator: author.name,
  publisher: author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    title: titleText,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: titleText,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleText,
    description: site.description,
    images: ['/og-image.png'],
    creator: social.x ? `@${social.x.split('/').pop()}` : undefined,
  },
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: site.name,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: site.themeColor,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', inter.variable, geistHeading.variable)}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        <WorkspaceShell>{children}</WorkspaceShell>
      </body>
    </html>
  )
}
