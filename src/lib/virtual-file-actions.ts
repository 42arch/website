import type { VirtualFile } from '@/lib/virtual-file-types'
import { useBlogStore } from '@/stores/apps/blog-store'
import { useGalleryStore } from '@/stores/apps/gallery-store'
import { useNotesStore } from '@/stores/apps/notes-store'
import { useProjectsStore } from '@/stores/apps/projects-store'
import { useShellStore } from '@/stores/shell-store'

export function openVirtualFile(file: VirtualFile, router?: { push: (href: string) => void }) {
  const openWindow = useShellStore.getState().openWindow

  if (file.kind === 'blog' && file.slug) {
    useBlogStore.getState().setSearchQuery('')
    useBlogStore.getState().setSelectedCategory('all')
    useBlogStore.getState().setSelectedSlug(file.slug)
    openWindow('blog')
    router?.push(`/blog/${file.slug}`)
  }
  else if (file.kind === 'note') {
    useNotesStore.getState().setSearchQuery(file.title ?? '')
    openWindow('notes')
  }
  else if (file.kind === 'project') {
    useProjectsStore.getState().setFilter('all')
    useProjectsStore.getState().setSelectedProjectTitle(file.title ?? '')
    openWindow('projects')
  }
  else if (file.kind === 'image' && file.albumId && file.imageIndex !== undefined) {
    useGalleryStore.getState().setActiveAlbumId(file.albumId)
    useGalleryStore.getState().setActiveImageIndex(file.imageIndex)
    openWindow('gallery')
  }
}
