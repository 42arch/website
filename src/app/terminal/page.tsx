import { getNotesList } from '@/components/apps/notes/data'
import { TerminalApp } from '@/components/apps/terminal'
import { noIndexMetadata } from '@/lib/site'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export const metadata = noIndexMetadata

export default function TerminalPage() {
  return <TerminalApp files={getVirtualFileSystem(getNotesList())} />
}
