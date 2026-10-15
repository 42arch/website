import type { AppId } from '@/lib/shell-routes'
import { create } from 'zustand'
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
  readme: { id: 'readme', title: 'README.mdx', open: false, minimized: false, maximized: false, z: 20 },
  projects: { id: 'projects', title: 'Projects.app', open: false, minimized: false, maximized: false, z: 20 },
  gallery: { id: 'gallery', title: 'Gallery.app', open: false, minimized: false, maximized: false, z: 21 },
  terminal: { id: 'terminal', title: 'Terminal.sh', open: false, minimized: false, maximized: false, z: 22 },
  notes: { id: 'notes', title: 'Notes.app', open: false, minimized: false, maximized: false, z: 24 },
  handbook: { id: 'handbook', title: 'Handbook.wiki', open: false, minimized: false, maximized: false, z: 23 },
  contact: { id: 'contact', title: 'Mail.msg', open: false, minimized: false, maximized: false, z: 24 },
  settings: { id: 'settings', title: 'Settings.app', open: false, minimized: false, maximized: false, z: 42 },
  design: { id: 'design', title: 'Design_Spec.fig', open: false, minimized: false, maximized: false, z: 25 },
  analytics: { id: 'analytics', title: 'Insights.db', open: false, minimized: false, maximized: false, z: 26 },
}

export interface ShellStore {
  // Windows
  windows: Record<AppId, WindowState>
  activeWindowId: AppId | null
  draggingWindowId: AppId | null
  topZIndex: number

  // Preferences & Appearance
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

let toastTimer: ReturnType<typeof setTimeout> | null = null

export const useShellStore = create<ShellStore>((set, get) => ({
  windows: initialWindows,
  activeWindowId: null,
  draggingWindowId: null,
  topZIndex: 45,

  wallpaperIndex: 0,
  themeMode: 'light',
  soundEnabled: true,
  mascotBubbleVisible: true,
  widgetsVisible: false,
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
      get().openWindow('readme')
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

  setWallpaperIndex: (idx: number) => {
    const { soundEnabled, showToast } = get()
    playTactileClick(620, 0.018, soundEnabled)
    const validIdx = Math.max(0, Math.min(cartoonWallpapers.length - 1, idx))
    const scene = cartoonWallpapers[validIdx]

    set({
      wallpaperIndex: validIdx,
      mascotQuoteIndex: 0,
    })

    showToast(`已切换卡通角色壁纸：${scene.name}`)
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
    const { soundEnabled, showToast } = get()
    playTactileClick(600, 0.02, soundEnabled)

    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (mode === 'dark') {
        root.classList.add('dark')
        root.classList.remove('light')
      }
      else {
        root.classList.remove('dark')
        root.classList.add('light')
      }
    }

    set({ themeMode: mode })
    showToast(mode === 'dark' ? '已切换至深色暗夜模式' : '已切换至浅色暖石模式')
    captureTelemetryEvent('theme_toggled', { mode })
  },

  toggleTheme: () => {
    const { themeMode, setThemeMode } = get()
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  },

  toggleSound: () => {
    const { soundEnabled, showToast } = get()
    const nextState = !soundEnabled
    if (nextState)
      playTactileClick(580, 0.016, true)

    set({ soundEnabled: nextState })
    showToast(nextState ? '已开启轻柔按键音' : '已静音')
  },

  toggleMascotBubble: () => {
    const { mascotBubbleVisible, soundEnabled, showToast } = get()
    playTactileClick(540, 0.015, soundEnabled)
    const nextState = !mascotBubbleVisible
    set({ mascotBubbleVisible: nextState })
    showToast(nextState ? '已显示角色对话气泡' : '已隐藏右下角角色对话气泡')
  },

  toggleWidgets: () => {
    const { widgetsVisible, soundEnabled, showToast } = get()
    playTactileClick(540, 0.015, soundEnabled)
    const nextState = !widgetsVisible
    set({ widgetsVisible: nextState })
    showToast(nextState ? '已显示桌面小组件' : '已隐藏桌面左上角小组件')
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
