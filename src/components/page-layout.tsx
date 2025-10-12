import type React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col border-border/70 border-dashed border-b dark:divide-border dark:border-border">
        {children}
      </main>
      <Footer />
    </div>
  )
}
