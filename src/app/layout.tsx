import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansSC-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/NotoSansSC-SemiBold.ttf',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../public/fonts/NotoSansSC-Bold.ttf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Starllow',
  description: 'Starllow lab, We build webapps and tools.',
  keywords: ['starllow']
}

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable)}
      suppressHydrationWarning
    >
      <body className='bg-background antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className='relative flex min-h-screen w-screen flex-none flex-col justify-between'>
              <Header />
              <main className='mx-3 grow border-l border-r border-dashed border-blue-200 dark:border-blue-300/15 md:mx-12'>
                {children}
              </main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
