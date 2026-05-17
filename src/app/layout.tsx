import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { WorkspaceShell } from '@/components/workspace/workspace-shell'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://folio-os.starllow.com'),
  title: {
    default: 'Folio OS — Developer Workspace',
    template: '%s | Folio OS',
  },
  description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a high-fidelity digital developer operating system.',
  keywords: [
    'developer portfolio',
    'workspace UI',
    'developer workspace',
    'digital operating system',
    'web OS',
    'Fumadocs portfolio',
    'Next.js portfolio',
    'creative developer',
    'interactive cv',
  ],
  authors: [{ name: 'Dan', url: 'https://folio-os.starllow.com' }],
  creator: 'Dan',
  publisher: 'Dan',
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
    locale: 'en_US',
    url: 'https://folio-os.starllow.com',
    title: 'Folio OS — Developer Workspace',
    description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a high-fidelity digital developer operating system.',
    siteName: 'Folio OS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Folio OS — Developer Workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Folio OS — Developer Workspace',
    description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a high-fidelity digital developer operating system.',
    images: ['/og-image.png'],
    creator: '@dan_dev',
  },
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Folio OS',
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
  themeColor: '#f5f2eb',
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
