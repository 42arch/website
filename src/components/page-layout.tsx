import type React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-h-screen flex flex-1 flex-col pt-0">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
