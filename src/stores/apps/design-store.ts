import { create } from 'zustand'

export type DesignTab = 'layout' | 'tokens' | 'ia'

interface DesignState {
  activeTab: DesignTab
  setActiveTab: (activeTab: DesignTab) => void
}

export const useDesignStore = create<DesignState>(set => ({
  activeTab: 'layout',
  setActiveTab: activeTab => set({ activeTab }),
}))
