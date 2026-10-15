import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { notesSource } from '@/lib/source'
import { NotesApp } from '@/components/apps/notes-app'

export async function generateStaticParams() {
  return notesSource.getPages().map(page => ({
    slug: page.slugs[0],
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = notesSource.getPage([slug])
  if (!page)
    return {}

  return {
    title: `${page.data.title} — Notes.app`,
    description: page.data.intro,
  }
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = notesSource.getPage([slug])
  if (!page) {
    notFound()
  }

  const allNotes = notesSource.getPages().map(p => ({
    slug: p.slugs[0],
    title: p.data.title,
    date: p.data.date,
    category: p.data.category,
    intro: p.data.intro,
    tags: p.data.tags ?? [],
  }))

  const MDX = page.data.body

  return (
    <NotesApp
      currentSlug={slug}
      notesList={allNotes}
      renderedContent={<MDX />}
      currentNote={{
        slug,
        title: page.data.title,
        date: page.data.date,
        category: page.data.category,
        intro: page.data.intro,
        tags: page.data.tags ?? [],
      }}
    />
  )
}
