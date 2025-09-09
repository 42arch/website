import type { Metadata } from 'next'
import type React from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
// import { Analytics } from '@vercel/analytics/next'
import { Montserrat, Ubuntu_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu-mono',
})

export const metadata: Metadata = {
  title: 'Starllow Lab',
  description: 'Personal website of Starllow Lab - Showcasing projects, blog posts, and creative work',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable} ${ubuntuMono.variable}`}>
        <Suspense fallback={null}>
          <RootProvider>{children}</RootProvider>
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
