import defaultMdxComponents from 'fumadocs-ui/mdx'
import { notFound } from 'next/navigation'
import { WritingDetailPanel } from '@/components/panels/writing-detail-panel'
import { calculateReadingTime } from '@/lib/content'
import { writing } from '@/lib/source'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return writing.getPages().map(page => ({
    slug: page.slugs,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = writing.getPage(slug)

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

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params
  const page = writing.getPage(slug)

  if (!page) {
    notFound()
  }

  const Content = page.data.body

  const readingTime = calculateReadingTime(page.data.structuredData.contents)
  const toc = page.data.toc || (page.data as any).exports?.toc || []

  return (
    <WritingDetailPanel
      title={page.data.title}
      date={(page.data as any).date || new Date()}
      tags={(page.data as any).tags || []}
      category={(page.data as any).category}
      readingTime={readingTime}
      description={page.data.description}
      toc={toc}
    >
      <Content components={defaultMdxComponents} />
    </WritingDetailPanel>
  )
}
