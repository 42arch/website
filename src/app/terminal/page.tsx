import { TerminalApp } from '@/components/apps/terminal-app'
import { getNotesList } from '@/lib/notes-data'
import { getVirtualFileSystem } from '@/lib/virtual-file-system'

export default function TerminalPage() {
  return <TerminalApp files={getVirtualFileSystem(getNotesList())} />
}
