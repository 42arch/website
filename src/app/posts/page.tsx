import { PostsPanel } from '@/components/panels/posts-panel'
import { posts as postsSource } from '@/lib/source'

export const metadata = {
  title: 'Posts',
  description: 'Technical notes, engineering logs, and design observations.',
}

export default function PostsPage() {
  const posts = postsSource.getPages()

  const sorted = [...posts].sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0).getTime()
    const dateB = new Date((b.data as any).date || 0).getTime()
    return dateB - dateA
  })

  const articles = sorted.map(post => ({
    id: post.slugs[0],
    url: post.url,
    title: post.data.title,
    description: post.data.description,
    date: (post.data as any).date || new Date(),
    tags: (post.data as any).tags || [],
    category: (post.data as any).category,
  }))

  return <PostsPanel articles={articles} />
}
