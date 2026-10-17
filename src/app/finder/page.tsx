import { FinderApp } from '@/components/apps/finder'
import { getNotesList } from '@/components/apps/notes/data'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export default function FinderPage() {
  return <FinderApp files={getVirtualFileSystem(getNotesList())} />
}
