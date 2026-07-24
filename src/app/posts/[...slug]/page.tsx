import defaultMdxComponents from 'fumadocs-ui/mdx'
import { notFound } from 'next/navigation'
import { Mermaid } from '@/components/mdx-mermaid'
import { PostsDetailPanel } from '@/components/panels/posts-detail-panel'
import { calculateReadingTime } from '@/lib/content'
import { posts } from '@/lib/source'

const mdxComponents = {
  ...defaultMdxComponents,
  Mermaid,
}

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return posts.getPages().map(page => ({
    slug: page.slugs,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = posts.getPage(slug)

  if (!page)
    return { title: 'Not Found' }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      publishedTime: (page.data as any).date ? new Date((page.data as any).date).toISOString() : undefined,
      tags: (page.data as any).tags || [],
    },
  }
}

export default async function PostsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const page = posts.getPage(slug)

  if (!page) {
    notFound()
  }

  const Content = page.data.body

  const readingTime = calculateReadingTime(page.data.structuredData.contents)
  const toc = page.data.toc || (page.data as any).exports?.toc || []

  // Resolve previous and next articles
  const allPosts = posts.getPages()
  const sorted = [...allPosts].sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0).getTime()
    const dateB = new Date((b.data as any).date || 0).getTime()
    return dateB - dateA
  })

  const currentIndex = sorted.findIndex(p => p.url === page.url)

  // Previous post (older, next in the list sorted newest-first)
  const prevPostPage = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null
  const prevPost = prevPostPage ? { title: prevPostPage.data.title, url: prevPostPage.url } : undefined

  // Next post (newer, previous in the list sorted newest-first)
  const nextPostPage = currentIndex > 0 ? sorted[currentIndex - 1] : null
  const nextPost = nextPostPage ? { title: nextPostPage.data.title, url: nextPostPage.url } : undefined

  return (
    <PostsDetailPanel
      title={page.data.title}
      date={(page.data as any).date || new Date()}
      tags={(page.data as any).tags || []}
      category={(page.data as any).category}
      readingTime={readingTime}
      description={page.data.description}
      toc={toc}
      prevPost={prevPost}
      nextPost={nextPost}
    >
      <Content components={mdxComponents} />
    </PostsDetailPanel>
  )
}
