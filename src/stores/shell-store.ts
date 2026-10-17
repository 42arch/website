import type { AppId } from '@/lib/shell-routes'
import { create } from 'zustand'
import { isAppId } from '@/lib/shell-routes'
import { captureTelemetryEvent } from '@/lib/telemetry'

export interface WindowState {
  id: AppId
  title: string
  open: boolean
  minimized: boolean
  maximized: boolean
  z: number
  x?: number
  y?: number
  width?: number
  height?: number
  prevRect?: {
    x?: number
    y?: number
    width?: number | string
    height?: number | string
  }
}

export interface WallpaperSceneInfo {
  id: 'hills' | 'orbit' | 'city' | 'coast'
  theme: 'light' | 'dark'
}

export interface PetPosition {
  x: number
  y: number
}

export const wallpaperScenes: WallpaperSceneInfo[] = [
  { id: 'hills', theme: 'light' },
  { id: 'orbit', theme: 'dark' },
  { id: 'city', theme: 'dark' },
  { id: 'coast', theme: 'light' },
]

const initialWindows: Record<AppId, WindowState> = {
  finder: { id: 'finder', title: 'Finder', open: false, minimized: false, maximized: false, z: 19 },
  bookmarks: { id: 'bookmarks', title: 'Bookmarks', open: false, minimized: false, maximized: false, z: 20 },
  projects: { id: 'projects', title: 'Projects.app', open: false, minimized: false, maximized: false, z: 20 },
  gallery: { id: 'gallery', title: 'Albums', open: false, minimized: false, maximized: false, z: 21 },
  music: { id: 'music', title: 'Music', open: false, minimized: false, maximized: false, z: 28 },
  terminal: { id: 'terminal', title: 'Terminal.sh', open: false, minimized: false, maximized: false, z: 22 },
  notes: { id: 'notes', title: 'Notes.app', open: false, minimized: false, maximized: false, z: 24 },
  blog: { id: 'blog', title: 'Blog.app', open: false, minimized: false, maximized: false, z: 24 },
  handbook: { id: 'handbook', title: 'Handbook.wiki', open: false, minimized: false, maximized: false, z: 23 },
  contact: { id: 'contact', title: 'Mail.msg', open: false, minimized: false, maximized: false, z: 24 },
  settings: { id: 'settings', title: 'Settings.app', open: false, minimized: false, maximized: false, z: 42 },
  about: { id: 'about', title: 'About This Computer', open: false, minimized: false, maximized: false, z: 43 },
  analytics: { id: 'analytics', title: 'Insights.db', open: false, minimized: false, maximized: false, z: 26 },
  game: { id: 'game', title: 'Snake.app', open: false, minimized: false, maximized: false, z: 27 },
}

const defaultDockAppIds: AppId[] = [
  'bookmarks',
  'blog',
  'projects',
  'notes',
  'gallery',
  'music',
  'contact',
  'terminal',
  'settings',
]

const dockStorageKey = 'starllow-os-dock-apps-v3'
const previousDockStorageKey = 'starllow-os-dock-apps-v2'
const legacyDockStorageKey = 'starllow-os-dock-apps'

function readDockAppIds(value: string | null): AppId[] | null {
  if (value === null)
    return null

  let parsed: unknown
  try {
    parsed = JSON.parse(value)
  }
  catch {
    return null
  }

  if (!Array.isArray(parsed))
    return null

  const normalizedIds = parsed.map((id: unknown) => id === 'browser' ? 'bookmarks' : id)
  return [...new Set(normalizedIds.filter((id: unknown): id is AppId => typeof id === 'string' && isAppId(id) && id !== 'finder'))]
}

export interface ShellStore {
  // Windows
  windows: Record<AppId, WindowState>
  dockAppIds: AppId[]
  activeWindowId: AppId | null
  draggingWindowId: AppId | null
  topZIndex: number

  // Preferences & Appearance
  hydratePreferences: () => void
  restorePreferences: () => void
  wallpaperIndex: number
  themeMode: 'light' | 'dark'
  widgetsVisible: boolean
  petVisible: boolean
  petPosition: PetPosition
  preferencesHydrated: boolean

  // UI Overlays
  commandPaletteOpen: boolean
  startMenuOpen: boolean
  toastMessage: string | null

  // Actions
  focusWindow: (id: AppId) => void
  openWindow: (id: AppId) => void
  closeWindow: (id: AppId) => void
  minimizeWindow: (id: AppId) => void
  maximizeWindow: (id: AppId) => void
  toggleWindow: (id: AppId) => void
  updateWindowPosition: (id: AppId, x: number, y: number) => void
  updateWindowRect: (id: AppId, x: number, y: number, width: number, height: number) => void
  setDraggingWindow: (id: AppId | null) => void
  tileWindows: () => void
  minimizeAllWindows: () => void
  openAllWindows: () => void
  hydrateDockAppIds: () => void
  setDockAppIds: (ids: AppId[]) => void

  setWallpaperIndex: (idx: number) => void
  cycleWallpaper: () => void
  setThemeMode: (mode: 'light' | 'dark') => void
  toggleTheme: () => void
  toggleWidgets: () => void
  setPetVisible: (visible: boolean) => void
  setPetPosition: (position: PetPosition) => void

  setCommandPaletteOpen: (open: boolean) => void
  toggleCommandPalette: () => void
  setStartMenuOpen: (open: boolean) => void
  toggleStartMenu: () => void
  showToast: (message: string) => void
}

type ShellPreferences = Pick<ShellStore, 'wallpaperIndex' | 'themeMode' | 'widgetsVisible' | 'petVisible' | 'petPosition'>

const defaultPreferences: ShellPreferences = {
  wallpaperIndex: 0,
  themeMode: 'light',
  widgetsVisible: false,
  petVisible: true,
  petPosition: { x: 0.62, y: 0.72 },
}

const preferencesStorageKey = 'starllow-os-preferences-v1'

function getStoredPreferences(): ShellPreferences | null {
  try {
    const storedValue = localStorage.getItem(preferencesStorageKey)
    if (!storedValue)
      return null

    const parsed: unknown = JSON.parse(storedValue)
    if (typeof parsed !== 'object' || parsed === null)
      return null

    const value = parsed as Record<string, unknown>
    const storedPosition = typeof value.petPosition === 'object' && value.petPosition !== null
      ? value.petPosition as Record<string, unknown>
      : null
    return {
      wallpaperIndex: typeof value.wallpaperIndex === 'number' && Number.isInteger(value.wallpaperIndex)
        ? Math.max(0, Math.min(wallpaperScenes.length - 1, value.wallpaperIndex))
        : defaultPreferences.wallpaperIndex,
      themeMode: value.themeMode === 'dark' ? 'dark' : 'light',
      widgetsVisible: typeof value.widgetsVisible === 'boolean' ? value.widgetsVisible : defaultPreferences.widgetsVisible,
      petVisible: typeof value.petVisible === 'boolean' ? value.petVisible : defaultPreferences.petVisible,
      petPosition: {
        x: typeof storedPosition?.x === 'number' && Number.isFinite(storedPosition.x)
          ? Math.max(0, Math.min(1, storedPosition.x))
          : defaultPreferences.petPosition.x,
        y: typeof storedPosition?.y === 'number' && Number.isFinite(storedPosition.y)
          ? Math.max(0, Math.min(1, storedPosition.y))
          : defaultPreferences.petPosition.y,
      },
    }
  }
  catch {
    return null
  }
}

function savePreferences(preferences: ShellPreferences) {
  try {
    const { wallpaperIndex, themeMode, widgetsVisible, petVisible, petPosition } = preferences
    localStorage.setItem(preferencesStorageKey, JSON.stringify({ wallpaperIndex, themeMode, widgetsVisible, petVisible, petPosition }))
  }
  catch {
    // Keep preferences in memory when local storage is unavailable.
  }
}

function applyThemeMode(mode: ShellPreferences['themeMode']) {
  if (typeof document === 'undefined')
    return

  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.classList.toggle('light', mode === 'light')
}

let toastTimer: ReturnType<typeof setTimeout> | null = null

export const useShellStore = create<ShellStore>((set, get) => ({
  windows: initialWindows,
  dockAppIds: defaultDockAppIds,
  activeWindowId: null,
  draggingWindowId: null,
  topZIndex: 45,

  ...defaultPreferences,
  preferencesHydrated: false,

  commandPaletteOpen: false,
  startMenuOpen: false,
  toastMessage: null,

  focusWindow: (id: AppId) => {
    const { topZIndex, windows } = get()
    const target = windows[id]
    if (!target)
      return

    const nextZ = topZIndex + 1

    set({
      activeWindowId: id,
      topZIndex: nextZ,
      windows: {
        ...windows,
        [id]: { ...target, z: nextZ, open: true, minimized: false },
      },
    })
  },

  openWindow: (id: AppId) => {
    const { topZIndex, windows } = get()
    const target = windows[id]
    if (!target)
      return

    const nextZ = topZIndex + 1
    captureTelemetryEvent('app_launched', { app: target.title })

    set({
      activeWindowId: id,
      topZIndex: nextZ,
      windows: {
        ...windows,
        [id]: {
          ...target,
          open: true,
          minimized: false,
          z: nextZ,
        },
      },
    })
  },

  closeWindow: (id: AppId) => {
    const { windows, activeWindowId } = get()
    const target = windows[id]
    if (!target)
      return

    captureTelemetryEvent('window_closed', { app: target.title })

    const updatedWindows = {
      ...windows,
      [id]: { ...target, open: false, minimized: false },
    }

    let nextActive = activeWindowId
    if (activeWindowId === id) {
      const remainingOpen = Object.values(updatedWindows)
        .filter(w => w.open && !w.minimized)
        .sort((a, b) => b.z - a.z)
      nextActive = remainingOpen[0]?.id || null
    }

    set({
      windows: updatedWindows,
      activeWindowId: nextActive,
    })
  },

  minimizeWindow: (id: AppId) => {
    const { windows, activeWindowId } = get()
    const target = windows[id]
    if (!target)
      return

    const updatedWindows = {
      ...windows,
      [id]: { ...target, minimized: true },
    }

    let nextActive = activeWindowId
    if (activeWindowId === id) {
      const remainingOpen = Object.values(updatedWindows)
        .filter(w => w.open && !w.minimized)
        .sort((a, b) => b.z - a.z)
      nextActive = remainingOpen[0]?.id || null
    }

    set({
      windows: updatedWindows,
      activeWindowId: nextActive,
    })
  },

  maximizeWindow: (id: AppId) => {
    const { windows } = get()
    const target = windows[id]
    if (!target)
      return

    set({
      windows: {
        ...windows,
        [id]: {
          ...target,
          maximized: !target.maximized,
        },
      },
    })
  },

  toggleWindow: (id: AppId) => {
    const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow } = get()
    const target = windows[id]
    if (!target)
      return

    if (!target.open || target.minimized) {
      openWindow(id)
    }
    else if (activeWindowId === id) {
      minimizeWindow(id)
    }
    else {
      focusWindow(id)
    }
  },

  updateWindowPosition: (id: AppId, x: number, y: number) => {
    const { windows } = get()
    const target = windows[id]
    if (!target)
      return

    set({
      windows: {
        ...windows,
        [id]: { ...target, x, y },
      },
    })
  },

  updateWindowRect: (id: AppId, x: number, y: number, width: number, height: number) => {
    const { windows } = get()
    const target = windows[id]
    if (!target)
      return

    set({
      windows: {
        ...windows,
        [id]: { ...target, x, y, width, height },
      },
    })
  },

  setDraggingWindow: id => set({ draggingWindowId: id }),

  tileWindows: () => {
    const { windows, showToast } = get()

    const openWins = Object.values(windows).filter(w => w.open && !w.minimized)
    if (openWins.length === 0) {
      get().openWindow('blog')
      get().openWindow('projects')
      return
    }

    const nextWindows = { ...windows }
    const baseLeft = typeof window !== 'undefined' && window.innerWidth < 1280 ? 24 : 180
    const baseTop = 24

    openWins.forEach((win, idx) => {
      nextWindows[win.id] = {
        ...win,
        maximized: false,
        x: baseLeft + idx * 36,
        y: baseTop + idx * 28,
        z: 30 + idx,
      }
    })

    const last = openWins.at(-1)

    set({
      windows: nextWindows,
      activeWindowId: last ? last.id : null,
      topZIndex: 30 + openWins.length,
    })

    showToast(`已为您整齐排列 ${openWins.length} 个窗口`)
  },

  minimizeAllWindows: () => {
    const { windows, showToast } = get()

    const nextWindows = { ...windows }
    Object.keys(nextWindows).forEach((k) => {
      const key = k as AppId
      if (nextWindows[key].open) {
        nextWindows[key] = { ...nextWindows[key], minimized: true }
      }
    })

    set({
      windows: nextWindows,
      activeWindowId: null,
    })

    showToast('已最小化全部窗口')
  },

  openAllWindows: () => {
    const { windows } = get()
    const nextWindows = { ...windows }
    Object.keys(nextWindows).forEach((k) => {
      const key = k as AppId
      nextWindows[key] = { ...nextWindows[key], open: true, minimized: false }
    })
    set({ windows: nextWindows })
    get().tileWindows()
  },

  hydrateDockAppIds: () => {
    try {
      const savedIds = readDockAppIds(localStorage.getItem(dockStorageKey))
      if (savedIds) {
        set({ dockAppIds: savedIds })
        return
      }

      const previousIds = readDockAppIds(localStorage.getItem(previousDockStorageKey))
      if (previousIds) {
        const migratedIds: AppId[] = [...previousIds.filter(id => id !== 'music'), 'music']
        set({ dockAppIds: migratedIds })
        localStorage.setItem(dockStorageKey, JSON.stringify(migratedIds))
        return
      }

      const legacyIds = readDockAppIds(localStorage.getItem(legacyDockStorageKey))
      if (legacyIds) {
        const migratedIds: AppId[] = [...legacyIds.filter(id => id !== 'handbook' && id !== 'finder' && id !== 'music'), 'music']
        set({ dockAppIds: migratedIds })
        localStorage.setItem(dockStorageKey, JSON.stringify(migratedIds))
      }
    }
    catch {
      // Keep default Dock items when local storage is unavailable or invalid.
    }
  },

  hydratePreferences: () => {
    const preferences = getStoredPreferences() || defaultPreferences
    set({ ...preferences, preferencesHydrated: true })
    applyThemeMode(preferences.themeMode)
    try {
      localStorage.setItem('theme', preferences.themeMode)
    }
    catch {
      // Keep the stored preference in memory when local storage is unavailable.
    }
  },

  restorePreferences: () => {
    set(defaultPreferences)
    savePreferences(defaultPreferences)
    applyThemeMode(defaultPreferences.themeMode)
    try {
      localStorage.setItem('theme', defaultPreferences.themeMode)
    }
    catch {
      // Theme remains applied for the current session when local storage is unavailable.
    }
  },

  setDockAppIds: (ids: AppId[]) => {
    const dockAppIds = [...new Set(ids.filter(id => id !== 'finder'))]
    set({ dockAppIds })
    try {
      localStorage.setItem(dockStorageKey, JSON.stringify(dockAppIds))
    }
    catch {
      // Keep the current session preference when local storage is unavailable.
    }
  },

  setWallpaperIndex: (idx: number) => {
    const validIdx = Math.max(0, Math.min(wallpaperScenes.length - 1, idx))
    const scene = wallpaperScenes[validIdx]

    set({ wallpaperIndex: validIdx })
    savePreferences({ ...get(), wallpaperIndex: validIdx })
    captureTelemetryEvent('wallpaper_switched', { scene: scene.id })
  },

  cycleWallpaper: () => {
    const { wallpaperIndex, setWallpaperIndex } = get()
    const next = (wallpaperIndex + 1) % wallpaperScenes.length
    setWallpaperIndex(next)
  },

  setThemeMode: (mode: 'light' | 'dark') => {
    applyThemeMode(mode)
    set({ themeMode: mode })
    savePreferences({ ...get(), themeMode: mode })
    try {
      localStorage.setItem('theme', mode)
    }
    catch {
      // The selected theme remains applied for the current session.
    }
    captureTelemetryEvent('theme_toggled', { mode })
  },

  toggleTheme: () => {
    const { themeMode, setThemeMode } = get()
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  },

  toggleWidgets: () => {
    const { widgetsVisible } = get()
    const nextState = !widgetsVisible
    set({ widgetsVisible: nextState })
    savePreferences({ ...get(), widgetsVisible: nextState })
  },

  setPetVisible: (visible: boolean) => {
    set({ petVisible: visible })
    savePreferences({ ...get(), petVisible: visible })
  },

  setPetPosition: (position: PetPosition) => {
    const petPosition = {
      x: Math.max(0, Math.min(1, position.x)),
      y: Math.max(0, Math.min(1, position.y)),
    }
    set({ petPosition })
    savePreferences({ ...get(), petPosition })
  },

  setCommandPaletteOpen: (open: boolean) => {
    set({ commandPaletteOpen: open, startMenuOpen: false })
  },

  toggleCommandPalette: () => {
    const { commandPaletteOpen, setCommandPaletteOpen } = get()
    setCommandPaletteOpen(!commandPaletteOpen)
  },

  setStartMenuOpen: (open: boolean) => {
    set({ startMenuOpen: open })
  },

  toggleStartMenu: () => {
    const { startMenuOpen, setStartMenuOpen } = get()
    setStartMenuOpen(!startMenuOpen)
  },

  showToast: (message: string) => {
    if (toastTimer)
      clearTimeout(toastTimer)

    set({ toastMessage: message })

    toastTimer = setTimeout(() => {
      set({ toastMessage: null })
      toastTimer = null
    }, 2400)
  },
}))
