import { create } from 'zustand'

interface NotesState {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useNotesStore = create<NotesState>(set => ({
  searchQuery: '',
  setSearchQuery: searchQuery => set({ searchQuery }),
}))
