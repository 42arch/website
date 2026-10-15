import { create } from 'zustand'

interface GalleryState {
  selectedId: string
  setSelectedId: (selectedId: string) => void
}

export const useGalleryStore = create<GalleryState>(set => ({
  selectedId: 'orbit',
  setSelectedId: selectedId => set({ selectedId }),
}))
