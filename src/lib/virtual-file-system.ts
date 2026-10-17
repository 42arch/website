import type { GalleryAlbum } from '@/components/apps/gallery/data'
import type { NoteMeta } from '@/components/apps/notes/data'
import type { ProjectItem } from '@/lib/shell-content'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseGalleryAlbums } from '@/components/apps/gallery/data'
import { parseMusicManifest } from '@/components/apps/music/manifest'
import { projectsData } from '@/lib/shell-content'
import { blogSource } from '@/lib/source'

function textSize(value: string) {
  return Buffer.byteLength(value, 'utf8')
}

function safeSlug(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'project'
}

function contentFile(folder: 'blog' | 'notes', slug: string) {
  const filePath = resolve(process.cwd(), 'content', folder, `${slug}.mdx`)
  const contentRoot = resolve(process.cwd(), 'content', folder)
  if (!filePath.startsWith(`${contentRoot}/`) || !existsSync(filePath))
    return ''

  return readFileSync(filePath, 'utf8')
}

function projectContent(project: ProjectItem) {
  return [
    `# ${project.title}`,
    '',
    project.desc,
    '',
    `Category: ${project.category}`,
    `Stack: ${project.stack.join(', ')}`,
    `Metric: ${project.metric}`,
    `Badge: ${project.badge}`,
  ].join('\n')
}

export function getVirtualFileSystem(notes: NoteMeta[]): VirtualFile[] {
  const galleryConfig: unknown = JSON.parse(readFileSync(resolve(process.cwd(), 'public/data/gallery.json'), 'utf8'))
  const galleryAlbums: GalleryAlbum[] = parseGalleryAlbums(galleryConfig) ?? []
  const musicConfig: unknown = JSON.parse(readFileSync(resolve(process.cwd(), 'public/data/music.json'), 'utf8'))
  const musicTracks = parseMusicManifest(musicConfig) ?? []
  const publicRoot = resolve(process.cwd(), 'public')

  const directories: VirtualFile[] = [
    { id: 'documents', path: '/Documents', name: 'Documents', kind: 'directory', modifiedAt: null, size: null },
    { id: 'documents-blog', path: '/Documents/Blog', name: 'Blog', kind: 'directory', modifiedAt: null, size: null },
    { id: 'documents-notes', path: '/Documents/Notes', name: 'Notes', kind: 'directory', modifiedAt: null, size: null },
    { id: 'documents-projects', path: '/Documents/Projects', name: 'Projects', kind: 'directory', modifiedAt: null, size: null },
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

  const projectFiles: VirtualFile[] = projectsData.map((project) => {
    const content = projectContent(project)
    return {
      id: `project-${safeSlug(project.title)}`,
      path: `/Documents/Projects/${safeSlug(project.title)}.project`,
      name: `${project.title}.project`,
      title: project.title,
      kind: 'project',
      modifiedAt: null,
      size: textSize(content),
      summary: project.desc,
      category: project.category,
      tags: project.stack,
      content,
    }
  })

  const imageFiles: VirtualFile[] = galleryAlbums.flatMap(album => album.images.map((image, imageIndex) => {
    const localImagePath = image.src.startsWith('/') ? resolve(process.cwd(), 'public', `.${image.src}`) : null
    const size = localImagePath && localImagePath.startsWith(`${resolve(process.cwd(), 'public')}/`) && existsSync(localImagePath)
      ? statSync(localImagePath).size
      : null

    return {
      id: `image-${album.id}-${image.id}`,
      path: `/Pictures/${album.id}/${image.id}${image.src.match(/\.[^.]+$/)?.[0] ?? '.jpg'}`,
      name: `${image.id}${image.src.match(/\.[^.]+$/)?.[0] ?? '.jpg'}`,
      title: image.title,
      kind: 'image' as const,
      modifiedAt: image.time,
      size,
      summary: image.description,
      category: album.title,
      albumId: album.id,
      imageIndex,
      src: image.src,
    }
  }))

  const musicFiles: VirtualFile[] = readdirSync(resolve(publicRoot, 'music'))
    .filter(name => name.toLocaleLowerCase().endsWith('.mp3'))
    .map((name) => {
      const track = musicTracks.find((item) => {
        try {
          return decodeURIComponent(item.src).split('/').at(-1) === name
        }
        catch {
          return false
        }
      })
      const localPath = resolve(publicRoot, 'music', name)

      return {
        id: track?.id ?? name,
        path: `/Music/${name}`,
        name,
        kind: 'audio',
        modifiedAt: null,
        size: existsSync(localPath) ? statSync(localPath).size : null,
        summary: track?.artist,
        category: track?.album,
        src: track?.src ?? `/music/${encodeURIComponent(name)}`,
      }
    })

  return [...directories, ...blogFiles, ...noteFiles, ...projectFiles, ...imageFiles, ...musicFiles]
}
