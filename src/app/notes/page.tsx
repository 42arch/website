import type { Metadata } from 'next'
import { NotesApp } from '@/components/apps/notes'
import { getNotesList } from '@/components/apps/notes/data'

export const metadata: Metadata = {
  title: 'Notes.app — Starllow.OS',
  description: '短小、随手可读的技术笔记。',
}

export default function NotesIndexPage() {
  return <NotesApp notesList={getNotesList()} />
}
