import HeroSection from '@/app/(home)/hero-section'
import ProjectsSection from '@/app/(home)/projects-section'
import { GridBackground } from '@/components/grid-background'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center ">
      <div className="relative flex w-full flex-col items-center overflow-x-hidden">
        <GridBackground maxWidthClass="container" columns={1} />
        <div className="relative flex items-center justify-center w-full mx-auto container">
          <div className="space-y-8">
            <HeroSection />
          </div>
        </div>

        <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
          <div className="text-center">
            <h2 className="text-3xl font-semibold dark:text-white capitalize">Projects</h2>
            {/* <p className="text-lg text-fd-muted-foreground mt-3 dark:text-gray-300 mb-0">Some of our open source projects</p> */}
          </div>
        </section>

        <div className="relative flex items-center justify-center w-full mx-auto container">
          <div className="space-y-8">
            <ProjectsSection />
          </div>
        </div>
      </div>
    </div>
  )
}
