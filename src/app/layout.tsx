import type { Metadata } from 'next'
import type React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { RootProvider } from 'fumadocs-ui/provider'
// import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import './styles/globals.css'

const fontMono = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMapleMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/JetBrainsMapleMono-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/JetBrainsMapleMono-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-mono',
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
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  return (
    <html
      lang="en"
      className={fontMono.className}
      suppressHydrationWarning
    >
      <body className="text-sm">
        <Suspense fallback={null}>
          <RootProvider>{children}</RootProvider>
        </Suspense>
        <GoogleAnalytics gaId={gaId || ''} />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
