import HeroSection from '@/app/(home)/hero-section'
import ProjectsSection from '@/app/(home)/projects-section'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="relative flex items-center justify-center border-b border-main">
        <HeroSection />
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center border-b border-main py-4">
          <div className="flex flex-row items-center gap-2 px-6">
            <div className="flex flex-row items-center">
              <div className="from-muted h-px w-20 bg-gradient-to-l to-transparent sm:w-40"></div>
              <div className="bg-muted/20 h-1.5 w-1.5 border"></div>
            </div>
            <div className="relative flex h-7 flex-row items-center whitespace-nowrap gap-2 rounded-md border px-4 text-sm font-medium">
              <span>Our Projects</span>
            </div>
            <div className="flex flex-row items-center">
              <div className="bg-muted/20 h-1.5 w-1.5 border"></div>
              <div className="from-muted h-px w-20 bg-gradient-to-r to-transparent sm:w-40"></div>
            </div>
          </div>
        </div>
        <div className="w-full mb-14">
          <ProjectsSection />
        </div>
      </div>
    </div>
  )
}
