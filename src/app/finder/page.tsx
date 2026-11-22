import { FinderApp } from '@/components/apps/finder'
import { getNotesList } from '@/components/apps/notes/data'
import { noIndexMetadata } from '@/lib/site'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export const metadata = noIndexMetadata

export default function FinderPage() {
  return <FinderApp files={getVirtualFileSystem(getNotesList())} />
}
