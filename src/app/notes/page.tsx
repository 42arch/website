import { NotesPanel } from '@/components/panels/notes-panel'
import { notes } from '@/lib/source'

export const metadata = {
  title: 'Notes',
  description: 'Quick observations, decisions, and technical notes.',
}

export default function NotesPage() {
  const allNotes = notes.getPages()

  const mappedNotes = allNotes.map(note => ({
    id: note.slugs[0],
    url: note.url,
    title: note.data.title,
    content: note.data.title,
    date: (note.data as any).date || new Date(),
    category: ((note.data as any).tags || [])[0],
  }))

  return <NotesPanel notes={mappedNotes} />
}
