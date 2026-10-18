import type { GalleryAlbum } from '@/components/apps/gallery/data'
import type { NoteMeta } from '@/components/apps/notes/data'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseGalleryAlbums } from '@/components/apps/gallery/data'
import { parseMusicManifest } from '@/components/apps/music/manifest'
import { blogSource } from '@/lib/source'
import galleryConfig from '../../public/data/gallery.json'
import musicConfig from '../../public/data/music.json'

function textSize(value: string) {
  return Buffer.byteLength(value, 'utf8')
}

function contentFile(folder: 'blog' | 'notes', slug: string) {
  const filePath = resolve(process.cwd(), 'content', folder, `${slug}.mdx`)
  const contentRoot = resolve(process.cwd(), 'content', folder)
  if (!filePath.startsWith(`${contentRoot}/`) || !existsSync(filePath))
    return ''

  return readFileSync(filePath, 'utf8')
}

export function getVirtualFileSystem(notes: NoteMeta[]): VirtualFile[] {
  const galleryAlbums: GalleryAlbum[] = parseGalleryAlbums(galleryConfig) ?? []
  const musicTracks = parseMusicManifest(musicConfig) ?? []

  const directories: VirtualFile[] = [
    { id: 'documents', path: '/Documents', name: 'Documents', kind: 'directory', modifiedAt: null, size: null },
    { id: 'documents-blog', path: '/Documents/Blog', name: 'Blog', kind: 'directory', modifiedAt: null, size: null },
    { id: 'documents-notes', path: '/Documents/Notes', name: 'Notes', kind: 'directory', modifiedAt: null, size: null },
    { id: 'pictures', path: '/Pictures', name: 'Pictures', kind: 'directory', modifiedAt: null, size: null },
    { id: 'music', path: '/Music', name: 'Music', kind: 'directory', modifiedAt: null, size: null },
    ...galleryAlbums.map(album => ({
      id: `pictures-${album.id}`,
      path: `/Pictures/${album.id}`,
      name: album.title,
      kind: 'directory' as const,
      modifiedAt: null,
      size: null,
      summary: album.description,
      albumId: album.id,
    })),
  ]

  const blogFiles: VirtualFile[] = blogSource.getPages().map((page) => {
    const slug = page.slugs[0]
    const content = contentFile('blog', slug)
    return {
      id: `blog-${slug}`,
      path: `/Documents/Blog/${slug}.mdx`,
      name: `${slug}.mdx`,
      title: page.data.title,
      kind: 'blog',
      modifiedAt: page.data.date ?? null,
      size: content ? textSize(content) : null,
      summary: page.data.intro,
      category: page.data.category,
      tags: page.data.tags ?? [],
      content,
      slug,
    }
  })

  const noteFiles: VirtualFile[] = notes.map((note) => {
    const content = contentFile('notes', note.slug)
    return {
      id: `note-${note.slug}`,
      path: `/Documents/Notes/${note.slug}.mdx`,
      name: `${note.slug}.mdx`,
      title: note.title,
      kind: 'note',
      modifiedAt: note.date,
      size: content ? textSize(content) : null,
      summary: note.intro,
      category: note.category,
      tags: note.tags,
      content,
      slug: note.slug,
    }
  })

  const imageFiles: VirtualFile[] = galleryAlbums.flatMap(album => album.images.map((image, imageIndex) => ({
    id: `image-${album.id}-${image.id}`,
    path: `/Pictures/${album.id}/${image.id}${image.src.match(/\.[^.]+$/)?.[0] ?? '.jpg'}`,
    name: `${image.id}${image.src.match(/\.[^.]+$/)?.[0] ?? '.jpg'}`,
    title: image.title,
    kind: 'image' as const,
    modifiedAt: image.time,
    size: null,
    summary: image.description,
    category: album.title,
    albumId: album.id,
    imageIndex,
    src: image.src,
  })))

  const musicFiles: VirtualFile[] = musicTracks.map((track) => {
    const name = decodeURIComponent(track.src).split('/').at(-1) ?? track.src

    return {
      id: track.id,
      path: `/Music/${name}`,
      name,
      kind: 'audio',
      modifiedAt: null,
      size: null,
      summary: track.artist,
      category: track.album,
      src: track.src,
      cover: track.cover,
    }
  })

  return [...directories, ...blogFiles, ...noteFiles, ...imageFiles, ...musicFiles]
}
