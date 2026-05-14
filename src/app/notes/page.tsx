import { NotesPanel } from '@/components/panels/notes-panel'
import { notes } from '@/lib/source'

export const metadata = {
  title: 'Notes | Folio OS',
  description: 'Quick observations, decisions, and technical notes.',
}

export default function NotesPage() {
  const allNotes = notes.getPages()

  const mappedNotes = allNotes.map(note => ({
    id: note.slugs[0],
    title: note.data.title,
    // For notes, we might want to render the body, but for a list view,
    // we'll just show the title for now or a small excerpt.
    content: note.data.title,
    date: (note.data as any).date || new Date(),
    category: ((note.data as any).tags || [])[0],
  }))

  return <NotesPanel notes={mappedNotes} />
}
