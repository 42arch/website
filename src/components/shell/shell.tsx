'use client'

import type { ReactNode } from 'react'
import type { NoteMeta } from '@/components/apps/notes/data'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { AppWindows } from '@/components/apps/app-windows'
import { MusicAudio } from '@/components/apps/music/components/music-audio'
import { resolveAppId } from '@/lib/shell-routes'
import { useShellStore } from '@/stores/shell-store'
import { ShellDock } from './dock'
import { ShellMenubar } from './menubar'
import { ShellSearch } from './search'
import { ShellToast } from './toast'
import { ShellWallpaper } from './wallpaper'

interface ShellProps {
  children?: ReactNode
  notesList: NoteMeta[]
  virtualFiles: VirtualFile[]
}

export function Shell({ children, notesList, virtualFiles }: ShellProps) {
  const pathname = usePathname()
  const renderedSegment = useSelectedLayoutSegment()
  const openWindow = useShellStore(state => state.openWindow)
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const draggingWindowId = useShellStore(state => state.draggingWindowId)
  const hydratePreferences = useShellStore(state => state.hydratePreferences)
  const isInitialSync = useRef(true)
  const segment = pathname.replace(/^\//, '').split('/')[0]
  // The route tree stays mounted when window focus only changes the URL.
  const renderedAppId = renderedSegment === null ? null : (resolveAppId(renderedSegment) ?? null)

  useEffect(() => {
    hydratePreferences()
  }, [hydratePreferences])

  // Sync route pathname -> window opening
  useEffect(() => {
    if (!pathname)
      return

    const resolved = resolveAppId(segment)
    if (resolved) {
      const { windows, activeWindowId, focusWindow } = useShellStore.getState()
      if (!windows[resolved].open || windows[resolved].minimized)
        openWindow(resolved)
      else if (activeWindowId !== resolved)
        focusWindow(resolved)
    }
  }, [pathname, segment, openWindow])

  // Sync focus to the address bar without remounting the current page window.
  useEffect(() => {
    if (isInitialSync.current) {
      isInitialSync.current = false
      return
    }

    if (activeWindowId !== useShellStore.getState().activeWindowId)
      return

    if (draggingWindowId)
      return

    if (typeof window !== 'undefined') {
      const currentSegment = window.location.pathname.replace(/^\//, '').split('/')[0]
      const currentAppId = resolveAppId(currentSegment)
      if (activeWindowId && currentAppId !== activeWindowId && (currentAppId || currentSegment === '')) {
        window.history.replaceState(null, '', `/${activeWindowId}`)
      }
      else if (!activeWindowId && currentAppId) {
        window.history.replaceState(null, '', '/')
      }
    }
  }, [activeWindowId, draggingWindowId])

  return (
    <div className="relative flex flex-col justify-between font-sans selection:bg-ph-orange/15 selection:text-ph-orange matte-grain h-screen w-screen overflow-hidden bg-ph-bg text-ph-ink">
      <MusicAudio />
      {/* ================= TOP macOS MENU BAR (28px) ================= */}
      <ShellMenubar />

      {/* ================= MAIN RESPONSIVE WORKSPACE ================= */}
      <main id="desktop-area" className="relative flex-1 w-full overflow-hidden">
        {/* Layered wallpaper and desktop shortcuts */}
        <ShellWallpaper />

        {/* Windows Rendering Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <AppWindows exclude={renderedAppId} notesList={notesList} virtualFiles={virtualFiles} />
          {children}
        </div>
      </main>

      {/* ================= BOTTOM FLOATING DOCK ================= */}
      <ShellDock />

      {/* ================= OVERLAYS (Spotlight & Toasts) ================= */}
      <ShellSearch notesList={notesList} />
      <ShellToast />
    </div>
  )
}
