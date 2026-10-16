import type { VirtualFile } from '@/lib/virtual-file-types'

export function getVirtualDirectoryChildren(files: VirtualFile[], path: string) {
  const parent = path.replace(/\/$/, '') || '/'
  return files.filter(file => {
    if (parent === '/') {
      if (!file.path.startsWith('/'))
        return false
    }
    else if (!file.path.startsWith(`${parent}/`)) {
      return false
    }

    const remainder = parent === '/' ? file.path.slice(1) : file.path.slice(parent.length + 1)
    return remainder.length > 0 && !remainder.includes('/')
  })
}

export function findVirtualFile(files: VirtualFile[], path: string) {
  const normalized = path.replace(/\/$/, '') || '/'
  return files.find(file => file.path === normalized)
}

export function listVirtualDirectory(files: VirtualFile[], path: string) {
  const target = path.replace(/\/$/, '') || '/'
  if (target === '/')
    return files.filter(file => file.path.startsWith('/'))
  return files.filter(file => file.path !== target && file.path.startsWith(`${target}/`))
}

export function normalizeVirtualPath(path: string, currentDirectory: string) {
  const source = path.startsWith('/') ? path : `${currentDirectory}/${path}`
  const segments: string[] = []

  for (const segment of source.split('/')) {
    if (!segment || segment === '.')
      continue
    if (segment === '..') {
      segments.pop()
      continue
    }
    segments.push(segment)
  }

  return `/${segments.join('/')}`
}
