import { create } from 'zustand'

interface GalleryState {
  selectedId: string
  activeAlbumId: string | null
  activeImageIndex: number | null
  setSelectedId: (selectedId: string) => void
  setActiveAlbumId: (activeAlbumId: string | null) => void
  setActiveImageIndex: (activeImageIndex: number | null | ((current: number | null) => number | null)) => void
}

export const useGalleryStore = create<GalleryState>(set => ({
  selectedId: 'orbit',
  activeAlbumId: null,
  activeImageIndex: null,
  setSelectedId: selectedId => set({ selectedId }),
  setActiveAlbumId: activeAlbumId => set({ activeAlbumId }),
  setActiveImageIndex: activeImageIndex => set(state => ({
    activeImageIndex: typeof activeImageIndex === 'function' ? activeImageIndex(state.activeImageIndex) : activeImageIndex,
  })),
}))
