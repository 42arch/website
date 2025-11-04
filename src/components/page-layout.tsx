import type React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="sticky top-0 z-30 container mx-auto bg-background/80 border-x border-b border-main">
        <Header />
      </header>
      <main className="flex-1 flex flex-col container mx-auto border-x border-main">
        {children}
      </main>
      <footer className="container mx-auto border-x border-main">
        <Footer />
      </footer>
    </div>
  )
}
