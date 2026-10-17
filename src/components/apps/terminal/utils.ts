import type { TerminalListCategory, TerminalListItem } from '@/components/apps/terminal/store'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { getVirtualDirectoryChildren, listVirtualDirectory } from '@/lib/virtual-file-utils'

export function tokenizeCommand(command: string) {
  return command.match(/"[^"]*"|'[^']*'|\S+/g)?.map(token => token.replace(/^("|')|("|')$/g, '')) ?? []
}

export function fileName(file: VirtualFile) {
  return file.title ?? file.name
}

export function sortedChildren(files: VirtualFile[], path: string) {
  return getVirtualDirectoryChildren(files, path).toSorted((left, right) => fileName(left).localeCompare(fileName(right), undefined, { numeric: true }))
}

export function treeOutput(files: VirtualFile[], path: string) {
  return listVirtualDirectory(files, path).toSorted((left, right) => left.path.localeCompare(right.path)).map((file) => {
    const relativePath = file.path.slice(path === '/' ? 1 : path.length + 1)
    const depth = relativePath.split('/').length - 1
    return `${'  '.repeat(depth)}${file.kind === 'directory' ? '▸' : '·'} ${file.name}${file.kind === 'directory' ? '/' : ''}`
  })
}

export function listEntries(category: TerminalListCategory, files: VirtualFile[], formatImageCount: (count: number) => string): TerminalListItem[] {
  const entries = category === 'blog'
    ? files.filter(file => file.kind === 'blog')
    : category === 'notes'
      ? files.filter(file => file.kind === 'note')
      : category === 'projects'
        ? files.filter(file => file.kind === 'project')
        : files.filter(file => file.kind === 'directory' && file.albumId)

  return entries.map(file => ({
    id: file.id,
    kind: category === 'gallery' ? 'album' : category === 'blog' ? 'blog' : category === 'notes' ? 'note' : 'project',
    title: file.title ?? file.name,
    summary: file.summary ?? '',
    detail: category === 'gallery'
      ? formatImageCount(getVirtualDirectoryChildren(files, file.path).length)
      : [file.category, ...(file.tags ?? [])].filter(Boolean).join(' · '),
    slug: file.slug,
    albumId: file.albumId,
  }))
}
