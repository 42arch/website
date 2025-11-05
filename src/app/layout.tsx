import type { Metadata } from 'next'
import type React from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
// import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import './styles/globals.css'

const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansSC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSansSC-SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../public/fonts/NotoSansSC-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Starllow Lab',
  description: 'Personal website of Starllow Lab - Showcasing projects, blog posts, and creative work',
  generator: 'Next.js',
  keywords: ['Starllow Lab', 'Starllow', 'rendan', 'Ren Dan', 'rend42', '42arch'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={fontSans.className}
      suppressHydrationWarning
    >
      <body className="text-sm">
        <Suspense fallback={null}>
          <RootProvider>{children}</RootProvider>
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
