import HeroSection from '@/app/(home)/hero-section'
import ProjectsSection from '@/app/(home)/projects-section'
import SectionIndicator from '@/components/section-indicator'
import ContactSection from './contact-section'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="relative flex items-center justify-center border-b border-main">
        <HeroSection />
      </div>

      <div className="w-full h-20 border-b border-main"></div>

      <div className="relative flex flex-col items-center justify-center">
        <SectionIndicator title="Projects" className="border-b border-main" />
        <div className="w-full">
          <ProjectsSection />
        </div>
      </div>

      <div className="w-full h-20 border-b border-main"></div>

      <div className="relative flex flex-col items-center justify-center">
        <SectionIndicator title="Contact" className="border-b border-main" />
        <div className="w-full ">
          <ContactSection />
        </div>
      </div>

      <div className="w-full h-20 border-b border-main"></div>
    </div>
  )
}
