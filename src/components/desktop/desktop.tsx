'use client'

import type { AppId, WallpaperName } from './app-registry'
import type { DesktopWindowState } from './desktop-types'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isAppId } from '@/lib/desktop-routes'
import { AppIcon } from './app-icon'
import { apps } from './app-registry'
import { AppWindow } from './app-window'
import { AppContent } from './apps/app-content'
import { Wallpaper } from './artwork'
import { DesktopDock } from './desktop-dock'
import { DesktopMenubar } from './desktop-menubar'
import { DesktopSearch } from './desktop-search'
import { useDesktopState } from './desktop-state-provider'

function appIdFromPath(pathname: string): AppId | undefined {
  const appId = pathname.split('/')[1]
  return appId && isAppId(appId) ? appId : undefined
}

function appPath(id: AppId) {
  return `/${id}`
}

export function Desktop() {
  const pathname = usePathname()
  const router = useRouter()
  const { windows, setWindows } = useDesktopState()
  const [wallpaper, setWallpaper] = useState<WallpaperName>('blue')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const desktop = useRef<HTMLElement>(null)
  const searchButton = useRef<HTMLButtonElement>(null)
  const routeAppId = appIdFromPath(pathname)
  const activeWindow = windows.find(item => item.id === routeAppId && !item.minimized)?.id
    || windows.findLast(item => !item.minimized)?.id

  const openApp = useCallback((id: AppId) => {
    setWindows((current) => {
      const existing = current.find(item => item.id === id)
      return [...current.filter(item => item.id !== id), existing ? { ...existing, minimized: false } : { id, x: Math.min(current.length, 4) * 26, y: Math.min(current.length, 4) * 20, minimized: false, maximized: false }]
    })
    router.push(appPath(id))
  }, [router])

  const focusWindow = useCallback((id: AppId) => {
    setWindows((current) => {
      if (current.at(-1)?.id === id)
        return current
      const item = current.find(item => item.id === id)
      return item ? [...current.filter(item => item.id !== id), item] : current
    })
    router.push(appPath(id))
  }, [router])

  function updateWindow(id: AppId, change: Partial<DesktopWindowState>) {
    setWindows(current => current.map(item => item.id === id ? { ...item, ...change } : item))
  }

  function returnFocusToDock(id: AppId) {
    document.getElementById(`dock-${id}`)?.focus()
  }

  function navigateAfterHiding(id: AppId) {
    if (activeWindow !== id)
      return
    const nextApp = windows.filter(item => item.id !== id && !item.minimized).at(-1)?.id
    router.push(nextApp ? appPath(nextApp) : '/')
  }

  useEffect(() => {
    if (pathname === '/') {
      setWindows(current => current.map(item => ({ ...item, minimized: true })))
      return
    }

    if (!routeAppId)
      return

    setWindows((current) => {
      const existing = current.find(item => item.id === routeAppId)
      if (existing && !existing.minimized && current.at(-1)?.id === routeAppId)
        return current
      const next = existing
        ? { ...existing, minimized: false }
        : {
            id: routeAppId,
            x: Math.min(current.length, 4) * 26,
            y: Math.min(current.length, 4) * 20,
            minimized: false,
            maximized: false,
          }
      return [...current.filter(item => item.id !== routeAppId), next]
    })
  }, [pathname, routeAppId])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('starllow:wallpaper:v1')
      if (saved === 'blue' || saved === 'sage' || saved === 'dusk')
        setWallpaper(saved)
    }
    catch { /* The desktop also works when browser storage is unavailable. */ }
    function resetPositions() {
      setWindows(current => current.map(item => ({ ...item, x: 0, y: 0 })))
    }
    window.addEventListener('resize', resetPositions)
    return () => window.removeEventListener('resize', resetPositions)
  }, [])

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(current => !current)
      }
      if (event.key === 'Escape' && !searchOpen && activeWindow && !(event.target instanceof HTMLInputElement)) {
        setWindows(current => current.map(item => item.id === activeWindow ? { ...item, minimized: true } : item))
        navigateAfterHiding(activeWindow)
        returnFocusToDock(activeWindow)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeWindow, searchOpen])

  function changeWallpaper(value: WallpaperName) {
    setWallpaper(value)
    try {
      localStorage.setItem('starllow:wallpaper:v1', value)
    }
    catch {
      /* Keep the selected wallpaper for the current visit. */
    }
  }

  function resetDesktop() {
    setWindows([{ id: 'home', x: 0, y: 0, minimized: false, maximized: false }])
    router.push(appPath('home'))
    returnFocusToDock('home')
  }

  return (
    <main ref={desktop} className="personal-os relative isolate h-dvh min-h-[560px] w-full overflow-hidden bg-[var(--desk)] text-[var(--ink)] [font-family:var(--font-sans),PingFang_SC,Microsoft_YaHei,sans-serif] text-[13px] antialiased max-[700px]:min-h-[570px]" data-wallpaper={wallpaper}>
      <a href="#desktop-dock" className="absolute -top-[70px] left-5 z-[300] bg-[var(--paper)] p-3 focus:top-12">跳至应用导航</a>
      <Wallpaper />
      <DesktopMenubar
        activeApp={activeWindow}
        onOpen={openApp}
        onSearch={() => setSearchOpen(true)}
      />

      <div className="absolute left-[5%] top-[83px] flex items-center gap-[9px] text-xs tracking-[.14em] text-[#334b60] dark:text-[#e4e9e4] max-[700px]:left-[21px] max-[700px]:top-[71px] max-[700px]:text-[10px] [&>span:first-child]:h-px [&>span:first-child]:w-5 [&>span:first-child]:bg-current [&>span:last-child]:ml-2 [&>span:last-child]:font-mono [&>span:last-child]:text-[9px] [&>span:last-child]:tracking-[.11em] [&>span:last-child]:opacity-65 max-[850px]:[&>span:last-child]:hidden">
        <span />
        一点代码，一点浪漫。
        <span>THIS IS MY LITTLE INTERNET.</span>
      </div>
      <nav className="absolute right-[26px] top-[90px] z-[2] flex flex-col gap-6 max-[700px]:left-[18px] max-[700px]:right-[18px] max-[700px]:top-[109px] max-[700px]:flex-row max-[700px]:justify-between max-[700px]:gap-[10px]" aria-label="桌面快捷方式">
        {(['projects', 'notes', 'gallery', 'contact'] as AppId[]).map(id => (
          <button key={id} className="flex w-[90px] flex-col items-center gap-[9px] rounded-[9px] border border-transparent p-[5px] hover:border-white/25 hover:bg-[#eef3ee24] max-[700px]:w-[69px] max-[700px]:gap-2" onClick={() => openApp(id)}>
            <AppIcon id={id} className="max-[700px]:!h-11 max-[700px]:!w-11 max-[700px]:!rounded-[11px] max-[700px]:[&>svg]:!h-[27px] max-[700px]:[&>svg]:!w-[27px]" />
            <span className="text-[11px] tracking-[.07em] text-[#293c4d] [text-shadow:0_1px_2px_#eff6f575] dark:text-[#f0f2e9] max-[700px]:text-[10px]">{apps.find(app => app.id === id)!.name}</span>
          </button>
        ))}
      </nav>
      <div className="pointer-events-none absolute inset-0">
        {windows.map((item, index) => (
          <AppWindow
            key={item.id}
            window={item}
            index={index}
            active={activeWindow === item.id}
            onFocus={() => focusWindow(item.id)}
            onMove={(x, y) => updateWindow(item.id, { x, y })}
            onClose={() => {
              setWindows(current => current.filter(win => win.id !== item.id))
              navigateAfterHiding(item.id)
              returnFocusToDock(item.id)
            }}
            onMinimize={() => {
              updateWindow(item.id, { minimized: true })
              navigateAfterHiding(item.id)
              returnFocusToDock(item.id)
            }}
            onMaximize={() => updateWindow(item.id, { maximized: !item.maximized })}
          >
            <AppContent id={item.id} onOpen={openApp} wallpaper={wallpaper} onWallpaper={changeWallpaper} onReset={resetDesktop} />
          </AppWindow>
        ))}
      </div>

      <footer className="absolute bottom-6 left-[30px] right-[30px] flex items-center justify-between text-[10px] text-[#344f63b3] dark:text-[#e4e9e4] max-[1150px]:justify-end max-[700px]:hidden [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:font-mono [&>button]:text-[9px] [&>button]:tracking-[.08em] [&>span>span]:size-[5px] [&>span>span]:rounded-full [&>span>span]:bg-[#647c68] max-[1150px]:[&>span]:hidden">
        <span>
          <span className="status-dot" />
          独立的小站，自由地生长。
        </span>
        <button onClick={() => openApp('contact')}>
          SAY HELLO
          <ArrowUpRightIcon size={14} />
        </button>
      </footer>
      <DesktopDock
        openWindows={windows.map(item => item.id)}
        activeApp={activeWindow}
        onOpen={openApp}
        onShowDesktop={() => {
          setWindows(current => current.map(item => ({ ...item, minimized: true })))
          router.push('/')
        }}
      />

      <DesktopSearch
        open={searchOpen}
        onOpenChange={(open) => {
          setSearchOpen(open)
          if (!open)
            setQuery('')
        }}
        query={query}
        onQueryChange={setQuery}
        onChoose={(id) => {
          openApp(id)
          setSearchOpen(false)
          setQuery('')
        }}
        searchButtonRef={searchButton}
        container={desktop.current}
      />
    </main>
  )
}
