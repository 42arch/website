'use client'

import type { AppId } from '@/lib/shell-routes'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { CornersOutIcon, MinusIcon, XIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useShellStore } from '@/stores/shell-store'

interface ShellWindowProps {
  id: AppId
  title?: string
  icon?: ReactNode
  badge?: string
  headerCenter?: ReactNode
  headerRight?: ReactNode
  defaultWidth?: string
  defaultHeight?: string
  defaultLeft?: number
  defaultTop?: number
  children: ReactNode
}

export function ShellWindow({
  id,
  title,
  icon,
  badge,
  headerCenter,
  headerRight,
  defaultWidth = 'min(680px, 92vw)',
  defaultHeight = 'min(520px, 75vh)',
  defaultLeft,
  defaultTop,
  children,
}: ShellWindowProps) {
  const tCommon = useTranslations('common')
  const win = useShellStore(state => state.windows[id])
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const focusWindow = useShellStore(state => state.focusWindow)
  const closeWindow = useShellStore(state => state.closeWindow)
  const minimizeWindow = useShellStore(state => state.minimizeWindow)
  const maximizeWindow = useShellStore(state => state.maximizeWindow)
  const updateWindowPosition = useShellStore(state => state.updateWindowPosition)
  const setDraggingWindow = useShellStore(state => state.setDraggingWindow)

  const isActive = activeWindowId === id
  const windowRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Position state (initialized once or from store)
  const [pos, setPos] = useState({
    x: win?.x ?? defaultLeft ?? 48,
    y: win?.y ?? defaultTop ?? 24,
  })
  const posRef = useRef(pos)

  useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 640)
      const maxX = Math.max(16, window.innerWidth - 360)
      if (pos.x > maxX && !win?.x) {
        setPos((prev) => {
          const next = { ...prev, x: Math.max(16, Math.min(prev.x, maxX)) }
          posRef.current = next
          return next
        })
      }
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [win?.x, pos.x])

  // Synchronize with external tile action if store coords change
  useEffect(() => {
    if (win?.x !== undefined && win?.y !== undefined) {
      const next = { x: win.x, y: win.y }
      posRef.current = next
      setPos(next)
    }
  }, [win?.x, win?.y])

  // Drag logic
  const isDragging = useRef(false)
  const dragStart = useRef({ clientX: 0, clientY: 0, startX: 0, startY: 0 })

  useEffect(() => () => {
    if (isDragging.current) {
      updateWindowPosition(id, posRef.current.x, posRef.current.y)
      if (useShellStore.getState().draggingWindowId === id)
        setDraggingWindow(null)
    }
  }, [id, updateWindowPosition, setDraggingWindow])

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.stopPropagation()
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input'))
      return

    if (win?.maximized || isMobile) {
      focusWindow(id)
      return
    }

    setDraggingWindow(id)
    focusWindow(id)
    isDragging.current = true
    dragStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: posRef.current.x,
      startY: posRef.current.y,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    catch {}
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging.current)
      return

    const deltaX = e.clientX - dragStart.current.clientX
    const deltaY = e.clientY - dragStart.current.clientY

    const newX = Math.max(-200, Math.min(window.innerWidth - 120, dragStart.current.startX + deltaX))
    const newY = Math.max(4, Math.min(window.innerHeight - 100, dragStart.current.startY + deltaY))

    const next = { x: newX, y: newY }
    posRef.current = next
    setPos(next)
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (isDragging.current) {
      isDragging.current = false
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      catch {}
      updateWindowPosition(id, posRef.current.x, posRef.current.y)
      setDraggingWindow(null)
    }
  }

  if (!win || !win.open || win.minimized)
    return null

  const displayTitle = title || win.title

  return (
    <div
      ref={windowRef}
      onPointerDown={() => focusWindow(id)}
      style={{
        zIndex: win.z,
        left: win.maximized || isMobile ? undefined : `${pos.x}px`,
        top: win.maximized || isMobile ? undefined : `${pos.y}px`,
        width: win.maximized || isMobile ? undefined : defaultWidth,
        height: win.maximized || isMobile ? undefined : defaultHeight,
      }}
      className={`absolute flex flex-col rounded-[8px] border bg-ph-surface/90 dark:bg-ph-surface/85 backdrop-blur-[22px] saturate-[145%] overflow-hidden pointer-events-auto transition-[box-shadow,transform] duration-150 ${
        isActive
          ? 'shadow-mac-active dark:shadow-mac-active-dark ring-1 ring-ph-orange/20'
          : 'shadow-mac dark:shadow-mac-dark'
      } ${
        win.maximized
          ? 'inset-x-2 top-2 bottom-14 !w-auto !h-auto max-sm:inset-1 max-sm:bottom-16'
          : 'max-sm:!inset-x-2 max-sm:!top-2 max-sm:!bottom-16 max-sm:!w-auto max-sm:!h-auto'
      }`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        onDoubleClick={() => maximizeWindow(id)}
        className="h-10 bg-ph-header border-b px-3.5 flex items-center justify-between cursor-move select-none shrink-0"
      >
        {/* Left: Traffic Light Control Group */}
        <div className="group flex items-center gap-2 w-20">
          {/* Close Dot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
            title={tCommon('close')}
            className="w-[11px] h-[11px] rounded-full bg-ph-red border border-black/15 flex items-center justify-center text-black/60 transition-transform active:scale-90 cursor-pointer"
          >
            <XIcon size={8} weight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Minimize Dot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(id)
            }}
            title={tCommon('minimize')}
            className="w-[11px] h-[11px] rounded-full bg-ph-yellow border border-black/15 flex items-center justify-center text-black/60 transition-transform active:scale-90 cursor-pointer"
          >
            <MinusIcon size={8} weight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Maximize Dot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              maximizeWindow(id)
            }}
            title={win.maximized ? tCommon('restore') : tCommon('maximize')}
            className="w-[11px] h-[11px] rounded-full bg-ph-green border border-black/15 flex items-center justify-center text-black/60 transition-transform active:scale-90 cursor-pointer"
          >
            <CornersOutIcon size={8} weight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Center Title or Custom Controls */}
        <div className="flex-1 flex items-center justify-center">
          {headerCenter || (
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-ph-ink">
              {icon}
              <span>{displayTitle}</span>
              {badge && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[4px] bg-black/5 dark:bg-white/10 text-[10px] text-ph-muted font-normal">
                  {badge}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Action Area */}
        <div className="w-20 flex justify-end">
          {headerRight}
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 flex overflow-hidden bg-ph-surface-body text-ph-ink select-text">
        {children}
      </div>
    </div>
  )
}
