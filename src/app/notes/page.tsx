import type { Metadata } from 'next'
import { NotesApp } from '@/components/apps/notes-app'
import { notesSource } from '@/lib/source'

export const metadata: Metadata = {
  title: '技术笔记 (Notes.app) — Starllow.OS',
  description: '基于 Fumadocs MDX 维护的 WebGL、3D 渲染与数据结构技术长文与知识总结。',
}

export default async function NotesIndexPage() {
  const pages = notesSource.getPages()
  const allNotes = pages.map(p => ({
    slug: p.slugs[0],
    title: p.data.title,
    date: p.data.date,
    category: p.data.category,
    intro: p.data.intro,
    tags: p.data.tags ?? [],
  }))

  return <NotesApp notesList={allNotes} />
}
