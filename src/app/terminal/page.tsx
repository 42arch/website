import { getNotesList } from '@/components/apps/notes/data'
import { TerminalApp } from '@/components/apps/terminal'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export default function TerminalPage() {
  return <TerminalApp files={getVirtualFileSystem(getNotesList())} />
}
