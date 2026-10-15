import { create } from 'zustand'

export type HandbookTab = 'principles' | 'notes'

interface HandbookState {
  activeTab: HandbookTab
  selectedNote: string | null
  setActiveTab: (activeTab: HandbookTab) => void
  setSelectedNote: (selectedNote: string | null) => void
}

export const useHandbookStore = create<HandbookState>(set => ({
  activeTab: 'principles',
  selectedNote: null,
  setActiveTab: activeTab => set({ activeTab }),
  setSelectedNote: selectedNote => set({ selectedNote }),
}))
