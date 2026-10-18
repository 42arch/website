import type { VirtualFile } from '@/lib/virtual-file-types'
import { useBlogStore } from '@/components/apps/blog/store'
import { useGalleryStore } from '@/components/apps/gallery/store'
import { useMusicStore } from '@/components/apps/music/store'
import { useNotesStore } from '@/components/apps/notes/store'
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
  else if (file.kind === 'image' && file.albumId && file.imageIndex !== undefined) {
    useGalleryStore.getState().setActiveAlbumId(file.albumId)
    useGalleryStore.getState().setActiveImageIndex(file.imageIndex)
    openWindow('gallery')
  }
  else if (file.kind === 'audio') {
    const musicStore = useMusicStore.getState()
    if (musicStore.tracks.some(track => track.id === file.id))
      musicStore.playTrack(file.id)
    openWindow('music')
  }
}
