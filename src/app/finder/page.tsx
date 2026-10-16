import { FinderApp } from '@/components/apps/finder-app'
import { getNotesList } from '@/lib/notes-data'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export default function FinderPage() {
  return <FinderApp files={getVirtualFileSystem(getNotesList())} />
}
