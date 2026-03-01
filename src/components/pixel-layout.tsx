import { PixelFooter } from '@/components/pixel-footer'
import { PixelNav } from '@/components/pixel-nav'

export function PixelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="site-scroll-root"
      className="pixel-grid scanlines flex h-dvh min-h-screen flex-col overflow-y-auto overflow-x-hidden"
    >
      <PixelNav />
      <main className="pixel-main-shell flex-1">{children}</main>
      <PixelFooter />
    </div>
  )
}
