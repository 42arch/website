import HeroSection from '@/components/hero-section'
import PageLayout from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { GridBackground } from '@/components/grid-background'

export default function HomePage() {
  return (
    <div className='flex flex-1 flex-col justify-center text-center'>
      <div className='relative flex w-full flex-col items-center overflow-x-hidden'>
        <GridBackground maxWidthClass="container" />
        <div className="relative flex items-center justify-center w-full mx-auto container">
          <div className="space-y-8">
            <HeroSection />
          </div>
        </div>

        {/* Recent Posts Section */}
        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
            <p className="text-gray-500">The recently published</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
            <p className="text-gray-500">The recently published</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
            <p className="text-gray-500">The recently published</p>
          </div>
        </section>
      </div>
    </div>
  )
}
