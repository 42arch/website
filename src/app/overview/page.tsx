import { OverviewPanel } from '@/components/panels/overview-panel'
import { writing } from '@/lib/source'

export const metadata = {
  title: 'Overview',
  description: 'System dashboard and high-level overview of projects and experiments.',
}

export default function OverviewPage() {
  const posts = writing.getPages()

  const sorted = [...posts].sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0).getTime()
    const dateB = new Date((b.data as any).date || 0).getTime()
    return dateB - dateA
  })

  const recentWritings = sorted.slice(0, 3).map(post => ({
    title: post.data.title,
    description: post.data.description || '',
    url: post.url,
    date: (post.data as any).date
      ? new Date((post.data as any).date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    tags: (post.data as any).tags || [],
  }))

  return <OverviewPanel recentWritings={recentWritings} />
}
