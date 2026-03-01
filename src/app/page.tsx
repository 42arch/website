import { HomeContact } from '@/components/home-contact'
import { HomeHero } from '@/components/home-hero'
import { RecentPosts } from '@/components/recent-posts'

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <div className="mx-auto my-8 max-w-3xl border-t border-dashed border-pixel-border-highlight" />
      <RecentPosts />
      <HomeContact />
    </div>
  )
}
