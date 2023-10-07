import { ThemeProvider } from '@/components/theme-provider'
import clsx from 'clsx'
import localFont from 'next/font/local'
import '../styles/global.css'

const handwrite = localFont({
  src: '../../public/fonts/Virgil.woff2',
  variable: '--font-handwrite',
  display: 'swap'
})

// const handwrite = localFont({
//   src: './fonts/Virgil.woff2',
//   variable: '--font-graphik',
//   display: 'swap'
// })

const graphik = localFont({
  src: [
    {
      path: '../../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold'
    }
  ],
  variable: '--font-graphik',
  display: 'swap'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('', graphik.variable, handwrite.variable)}>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <div className="text-dark bg-light dark:text-light dark:bg-dark selection:bg-slate-100 selection:text-primary font-sans">
            {children}
          </div>
        </ThemeProvider>
        {/* <Sidebar /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
