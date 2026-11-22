import { noIndexMetadata } from '@/lib/site'
import { notesSource } from '@/lib/source'
import { LegacyNoteRedirect } from './legacy-note-redirect'

export const metadata = noIndexMetadata

export const dynamicParams = false

export function generateStaticParams() {
  return notesSource.getPages().map(page => ({ slug: page.slugs[0] }))
}

export default function LegacyNotePage() {
  return <LegacyNoteRedirect />
}
