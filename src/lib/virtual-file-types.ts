export type VirtualFileKind = 'directory' | 'blog' | 'note' | 'image' | 'audio' | 'app'

export interface VirtualFile {
  id: string
  path: string
  name: string
  title?: string
  kind: VirtualFileKind
  modifiedAt: string | null
  size: number | null
  summary?: string
  category?: string
  tags?: string[]
  content?: string
  cover?: string
  slug?: string
  appId?: string
  albumId?: string
  imageIndex?: number
  src?: string
}
