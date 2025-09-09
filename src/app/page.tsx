import HeroSection from '@/components/hero-section'
import PageLayout from '@/components/page-layout'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6">
        <div className="text-center py-20">
          <div className="mb-6">
            <span className="text-sm text-gray-500">Latest • from a blog using FumaDocs →</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-balance">
            I am Rajiv
            <br />
            learner
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto text-balance">
            Welcome to rjv.im - This is where I document my work on open source projects, company and include thoughts
            and ideas.
          </p>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="px-6 bg-transparent">
              Let's Connect
            </Button>
            <Button className="px-6 bg-black hover:bg-gray-800">Read Posts</Button>
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

        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
            <p className="text-gray-500">The recently published</p>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
