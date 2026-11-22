import { NotesApp } from '@/components/apps/notes'
import { getNotesList } from '@/components/apps/notes/data'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('短笔记', '短小、随手可读的技术笔记。', '/notes')

export default function NotesIndexPage() {
  return <NotesApp notesList={getNotesList()} />
}
