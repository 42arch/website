import { notFound } from 'next/navigation'
import { WritingDetailPanel } from '@/components/panels/writing-detail-panel'
import { writing } from '@/lib/source'
import defaultMdxComponents from 'fumadocs-ui/mdx'

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
    return { title: 'Not Found | Folio OS' }

  return {
    title: `${page.data.title} | Folio OS`,
    description: page.data.description,
  }
}

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params
  const page = writing.getPage(slug)

  if (!page) {
    notFound()
  }

  const Content = page.data.body

  // Calculate reading time
  const wordCount = page.data.structuredData.contents.reduce((acc, curr) => {
    return acc + curr.content.split(/\s+/).length
  }, 0)
  const readingTime = `${Math.ceil(wordCount / 200)} min read`

  return (
    <WritingDetailPanel
      title={page.data.title}
      date={(page.data as any).date || new Date()}
      tags={(page.data as any).tags || []}
      category={(page.data as any).category}
      readingTime={readingTime}
      description={page.data.description}
    >
      <Content components={defaultMdxComponents} />
    </WritingDetailPanel>
  )
}
