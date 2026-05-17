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
  title: 'Folio OS — Developer Workspace',
  description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a digital operating system.',
  keywords: ['developer', 'portfolio', 'workspace', 'interactive', 'experimental'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
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
