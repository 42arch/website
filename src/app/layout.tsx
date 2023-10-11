import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import clsx from 'clsx'
import localFont from 'next/font/local'
import '../styles/global.css'

const handwrite = localFont({
  src: '../../public/fonts/Virgil.woff2',
  variable: '--font-handwrite',
  display: 'swap'
})

const onest = localFont({
  src: [
    {
      path: '../../public/fonts/Onest-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Onest-SemiBold.ttf',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../public/fonts/Onest-Bold.ttf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-onest',
  display: 'swap'
})

const empo = localFont({
  src: [
    {
      path: '../../public/fonts/Empo-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Empo-Bold.ttf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-empo',
  display: 'swap'
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(
        'selection:bg-slate-100 selection:text-primary',
        onest.variable,
        empo.variable,
        handwrite.variable
      )}>
      <body className="antialiased mx-auto px-4 font-sans dark:text-white dark:bg-dark">
        <ThemeProvider>
          <div className="text-zinc-950 dark:text-zinc-50">{children}</div>
        </ThemeProvider>
        {/* <Sidebar /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
