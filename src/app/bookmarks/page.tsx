import { BookmarksApp } from '@/components/apps/bookmarks'
import { noIndexMetadata } from '@/lib/site'

export const metadata = noIndexMetadata

export default function BookmarksPage() {
  return <BookmarksApp />
}
