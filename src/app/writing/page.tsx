import { WritingPanel } from '@/components/panels/writing-panel'
import { writing } from '@/lib/source'

export const metadata = {
  title: 'Writing',
  description: 'Technical notes, engineering logs, and design observations.',
}

export default function WritingPage() {
  const posts = writing.getPages()

  const articles = posts.map(post => ({
    id: post.slugs[0],
    url: post.url,
    title: post.data.title,
    description: post.data.description,
    date: (post.data as any).date || new Date(),
    tags: (post.data as any).tags || [],
    category: (post.data as any).category,
  }))

  return <WritingPanel articles={articles} />
}
