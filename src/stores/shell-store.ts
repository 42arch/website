import type { AppId } from '@/lib/shell-routes'
import { create } from 'zustand'
import { isAppId } from '@/lib/shell-routes'
import { playTactileClick } from '@/lib/sound'
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
  prevRect?: {
    x?: number
    y?: number
    width?: number | string
    height?: number | string
  }
}

export interface CartoonSceneInfo {
  name: string
  tag: string
  quotes: string[]
}

export const cartoonWallpapers: CartoonSceneInfo[] = [
  {
    name: '刺猬工程师 Max',
    tag: 'MAX THE HEDGEHOG',
    quotes: [
      '“嗨！壁纸切换和外观音效现在都整理到『系统设置』面板里啦！”',
      '“手冲咖啡配 TypeScript，今天又消灭了 3 个棘手的 Bug！”',
      '“小提示：点击顶栏『窗口 -> 最小化全部』可以无遮挡欣赏整张插画壁纸哦。”',
    ],
  },
  {
    name: '太空柴犬宇航员',
    tag: 'ASTRO SHIBA INU',
    quotes: [
      '“汪！这里是月球边缘节点，网络延迟只有 12ms！”',
      '“正在观测您的开源仓库 Star 增长曲线，一切运行良好！”',
    ],
  },
  {
    name: '极客黑猫 Coder',
    tag: 'LO-FI CAT CODER',
    quotes: [
      '“戴上降噪耳机写 Rust，连编译通过的声音都像 Lo-Fi 音乐。”',
      '“呼噜呼噜……别忘了按 ⌘K 试试全局命令面板！”',
    ],
  },
]

const initialWindows: Record<AppId, WindowState> = {
  finder: { id: 'finder', title: 'Finder', open: false, minimized: false, maximized: false, z: 19 },
  projects: { id: 'projects', title: 'Projects.app', open: false, minimized: false, maximized: false, z: 20 },
  gallery: { id: 'gallery', title: 'Albums', open: false, minimized: false, maximized: false, z: 21 },
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
  'blog',
  'projects',
  'notes',
  'gallery',
  'contact',
  'terminal',
  'settings',
]

const dockStorageKey = 'starllow-os-dock-apps-v2'
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

  return [...new Set(parsed.filter((id: unknown): id is AppId => typeof id === 'string' && isAppId(id) && id !== 'finder'))]
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
  soundEnabled: boolean
  mascotBubbleVisible: boolean
  widgetsVisible: boolean
  mascotQuoteIndex: number

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
  setDraggingWindow: (id: AppId | null) => void
  tileWindows: () => void
  minimizeAllWindows: () => void
  openAllWindows: () => void
  hydrateDockAppIds: () => void
  setDockAppIds: (ids: AppId[]) => void

  setWallpaperIndex: (idx: number) => void
  cycleWallpaper: () => void
  cycleMascotQuote: () => void
  setThemeMode: (mode: 'light' | 'dark') => void
  toggleTheme: () => void
  toggleSound: () => void
  toggleMascotBubble: () => void
  toggleWidgets: () => void

  setCommandPaletteOpen: (open: boolean) => void
  toggleCommandPalette: () => void
  setStartMenuOpen: (open: boolean) => void
  toggleStartMenu: () => void
  showToast: (message: string) => void
}

type ShellPreferences = Pick<ShellStore, 'wallpaperIndex' | 'themeMode' | 'soundEnabled' | 'mascotBubbleVisible' | 'widgetsVisible'>

const defaultPreferences: ShellPreferences = {
  wallpaperIndex: 0,
  themeMode: 'light',
  soundEnabled: true,
  mascotBubbleVisible: true,
  widgetsVisible: false,
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
    return {
      wallpaperIndex: typeof value.wallpaperIndex === 'number' && Number.isInteger(value.wallpaperIndex)
        ? Math.max(0, Math.min(cartoonWallpapers.length - 1, value.wallpaperIndex))
        : defaultPreferences.wallpaperIndex,
      themeMode: value.themeMode === 'dark' ? 'dark' : 'light',
      soundEnabled: typeof value.soundEnabled === 'boolean' ? value.soundEnabled : defaultPreferences.soundEnabled,
      mascotBubbleVisible: typeof value.mascotBubbleVisible === 'boolean' ? value.mascotBubbleVisible : defaultPreferences.mascotBubbleVisible,
      widgetsVisible: typeof value.widgetsVisible === 'boolean' ? value.widgetsVisible : defaultPreferences.widgetsVisible,
    }
  }
  catch {
    return null
  }
}

function savePreferences(preferences: ShellPreferences) {
  try {
    localStorage.setItem(preferencesStorageKey, JSON.stringify(preferences))
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
  mascotQuoteIndex: 0,

  commandPaletteOpen: false,
  startMenuOpen: false,
  toastMessage: null,

  focusWindow: (id: AppId) => {
    const { topZIndex, windows, soundEnabled } = get()
    const target = windows[id]
    if (!target)
      return

    const nextZ = topZIndex + 1
    playTactileClick(540, 0.015, soundEnabled)

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
    const { topZIndex, windows, soundEnabled } = get()
    const target = windows[id]
    if (!target)
      return

    const nextZ = topZIndex + 1
    playTactileClick(580, 0.016, soundEnabled)
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
    const { windows, soundEnabled, activeWindowId } = get()
    const target = windows[id]
    if (!target)
      return

    playTactileClick(380, 0.016, soundEnabled)
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
    const { windows, soundEnabled, activeWindowId } = get()
    const target = windows[id]
    if (!target)
      return

    playTactileClick(440, 0.015, soundEnabled)

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
    const { windows, soundEnabled } = get()
    const target = windows[id]
    if (!target)
      return

    playTactileClick(640, 0.018, soundEnabled)

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

  setDraggingWindow: id => set({ draggingWindowId: id }),

  tileWindows: () => {
    const { windows, soundEnabled, showToast } = get()
    playTactileClick(560, 0.02, soundEnabled)

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
    const { windows, soundEnabled, showToast } = get()
    playTactileClick(400, 0.018, soundEnabled)

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

      const legacyIds = readDockAppIds(localStorage.getItem(legacyDockStorageKey))
      if (legacyIds) {
        const migratedIds = legacyIds.filter(id => id !== 'handbook' && id !== 'finder')
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
    set(preferences)
    applyThemeMode(preferences.themeMode)
    try {
      localStorage.setItem('theme', preferences.themeMode)
    }
    catch {
      // Keep the stored preference in memory when local storage is unavailable.
    }
  },

  restorePreferences: () => {
    set({ ...defaultPreferences, mascotQuoteIndex: 0 })
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
    const { soundEnabled } = get()
    playTactileClick(620, 0.018, soundEnabled)
    const validIdx = Math.max(0, Math.min(cartoonWallpapers.length - 1, idx))
    const scene = cartoonWallpapers[validIdx]

    set({
      wallpaperIndex: validIdx,
      mascotQuoteIndex: 0,
    })
    savePreferences({ ...get(), wallpaperIndex: validIdx })
    captureTelemetryEvent('cartoon_wallpaper_switched', { character: scene.name })
  },

  cycleWallpaper: () => {
    const { wallpaperIndex, setWallpaperIndex } = get()
    const next = (wallpaperIndex + 1) % cartoonWallpapers.length
    setWallpaperIndex(next)
  },

  cycleMascotQuote: () => {
    const { wallpaperIndex, mascotQuoteIndex, soundEnabled } = get()
    playTactileClick(680, 0.016, soundEnabled)
    const scene = cartoonWallpapers[wallpaperIndex]
    const nextIdx = (mascotQuoteIndex + 1) % scene.quotes.length

    set({ mascotQuoteIndex: nextIdx })
    captureTelemetryEvent('mascot_clicked', { character: scene.name })
  },

  setThemeMode: (mode: 'light' | 'dark') => {
    const { soundEnabled } = get()
    playTactileClick(600, 0.02, soundEnabled)
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

  toggleSound: () => {
    const { soundEnabled } = get()
    const nextState = !soundEnabled
    if (nextState)
      playTactileClick(580, 0.016, true)

    set({ soundEnabled: nextState })
    savePreferences({ ...get(), soundEnabled: nextState })
  },

  toggleMascotBubble: () => {
    const { mascotBubbleVisible, soundEnabled } = get()
    playTactileClick(540, 0.015, soundEnabled)
    const nextState = !mascotBubbleVisible
    set({ mascotBubbleVisible: nextState })
    savePreferences({ ...get(), mascotBubbleVisible: nextState })
  },

  toggleWidgets: () => {
    const { widgetsVisible, soundEnabled } = get()
    playTactileClick(540, 0.015, soundEnabled)
    const nextState = !widgetsVisible
    set({ widgetsVisible: nextState })
    savePreferences({ ...get(), widgetsVisible: nextState })
  },

  setCommandPaletteOpen: (open: boolean) => {
    const { soundEnabled } = get()
    playTactileClick(open ? 550 : 380, 0.015, soundEnabled)
    set({ commandPaletteOpen: open, startMenuOpen: false })
  },

  toggleCommandPalette: () => {
    const { commandPaletteOpen, setCommandPaletteOpen } = get()
    setCommandPaletteOpen(!commandPaletteOpen)
  },

  setStartMenuOpen: (open: boolean) => {
    const { soundEnabled } = get()
    playTactileClick(520, 0.015, soundEnabled)
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
