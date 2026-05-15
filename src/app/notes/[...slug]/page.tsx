import defaultMdxComponents from 'fumadocs-ui/mdx'
import { notFound } from 'next/navigation'
import { NoteDetailPanel } from '@/components/panels/note-detail-panel'
import { notes } from '@/lib/source'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return notes.getPages().map(page => ({
    slug: page.slugs,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = notes.getPage(slug)

  if (!page)
    return { title: 'Not Found | Folio OS' }

  return {
    title: `${page.data.title} | Folio OS`,
    description: page.data.description,
  }
}

export default async function NoteDetailPage({ params }: PageProps) {
  const { slug } = await params
  const page = notes.getPage(slug)

  if (!page) {
    notFound()
  }

  const Content = page.data.body

  return (
    <NoteDetailPanel
      title={page.data.title}
      date={(page.data as any).date || new Date()}
      tags={(page.data as any).tags || []}
    >
      <Content components={defaultMdxComponents} />
    </NoteDetailPanel>
  )
}
