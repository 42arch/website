import { create } from 'zustand'

interface NotesState {
  selectedSlug: string | null
  searchQuery: string
  selectedCategory: string
  setSelectedSlug: (slug: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
}

export const useNotesStore = create<NotesState>(set => ({
  selectedSlug: 'gpu-picking',
  searchQuery: '',
  selectedCategory: 'all',
  setSelectedSlug: slug => set({ selectedSlug: slug }),
  setSearchQuery: searchQuery => set({ searchQuery }),
  setSelectedCategory: selectedCategory => set({ selectedCategory }),
}))
