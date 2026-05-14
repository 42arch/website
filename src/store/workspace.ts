import { create } from 'zustand'

export type PanelId = 'overview' | 'projects' | 'experiments' | 'writing' | 'gallery' | 'notes' | 'activity' | 'contact'

export interface Tab {
  id: PanelId
  label: string
  icon: string
}

export const PANEL_CONFIG: Record<PanelId, { label: string, icon: string }> = {
  overview: { label: 'Overview', icon: 'house' },
  projects: { label: 'Projects', icon: 'folder' },
  experiments: { label: 'Experiments', icon: 'flask' },
  writing: { label: 'Writing', icon: 'article' },
  gallery: { label: 'Gallery', icon: 'images' },
  notes: { label: 'Notes', icon: 'notepad' },
  activity: { label: 'Activity', icon: 'activity' },
  contact: { label: 'Contact', icon: 'envelope' },
}

interface WorkspaceState {
  openTabs: string[]
  sidebarOpen: boolean
  bottomPanelOpen: boolean
  bottomPanelHeight: number
  commandPaletteOpen: boolean
  sidebarWidth: number

  openTab: (id: string) => void
  closeTab: (id: string) => void
  toggleSidebar: () => void
  toggleBottomPanel: () => void
  setBottomPanelHeight: (h: number) => void
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void
  setSidebarWidth: (w: number) => void
  setOpenTabs: (tabs: string[]) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  openTabs: ['overview'],
  sidebarOpen: true,
  bottomPanelOpen: true,
  bottomPanelHeight: 200,
  commandPaletteOpen: false,
  sidebarWidth: 220,

  openTab: (id) => {
    const { openTabs } = get()
    if (!openTabs.includes(id)) {
      set({ openTabs: [...openTabs, id] })
    }
  },

  closeTab: (id) => {
    const { openTabs } = get()
    const filtered = openTabs.filter(t => t !== id)
    if (filtered.length === 0)
      filtered.push('overview')
    set({ openTabs: filtered })
  },

  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleBottomPanel: () => set(s => ({ bottomPanelOpen: !s.bottomPanelOpen })),
  setBottomPanelHeight: h => set({ bottomPanelHeight: h }),
  toggleCommandPalette: () => set(s => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setCommandPaletteOpen: open => set({ commandPaletteOpen: open }),
  setSidebarWidth: w => set({ sidebarWidth: w }),
  setOpenTabs: tabs => set({ openTabs: tabs }),
}))
