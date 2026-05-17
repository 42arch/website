import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { WorkspaceShell } from '@/components/workspace/workspace-shell'
import { cn } from '@/lib/utils'

import './globals.css'

const geistHeading = Geist({ subsets: ['latin'], variable: '--font-heading' })

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
