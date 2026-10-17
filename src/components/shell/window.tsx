'use client'

import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, PointerEvent as ReactPointerEvent } from 'react'
import type { AppId } from '@/lib/shell-routes'
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

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

interface ResizeStart {
  direction: ResizeDirection
  pointerId: number
  clientX: number
  clientY: number
  left: number
  top: number
  width: number
  height: number
}

const resizeHandles: { direction: ResizeDirection, className: string }[] = [
  { direction: 'n', className: 'inset-x-3 top-0 h-1.5 cursor-n-resize' },
  { direction: 's', className: 'inset-x-3 bottom-0 h-1.5 cursor-s-resize' },
  { direction: 'e', className: 'inset-y-3 right-0 w-1.5 cursor-e-resize' },
  { direction: 'w', className: 'inset-y-3 left-0 w-1.5 cursor-w-resize' },
  { direction: 'ne', className: 'right-0 top-0 size-3 cursor-ne-resize' },
  { direction: 'nw', className: 'left-0 top-0 size-3 cursor-nw-resize' },
  { direction: 'sw', className: 'bottom-0 left-0 size-3 cursor-sw-resize' },
]

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
  const updateWindowRect = useShellStore(state => state.updateWindowRect)
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
  const [size, setSize] = useState({ width: win?.width, height: win?.height })
  const resizeStartRef = useRef<ResizeStart | null>(null)

  useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 640)
      const element = windowRef.current
      if (!element || !win?.open || win.maximized || window.innerWidth < 640)
        return

      const workspace = element.offsetParent as HTMLElement | null
      const maxX = Math.max(12, (workspace?.clientWidth ?? window.innerWidth) - element.offsetWidth - 12)
      const maxY = Math.max(4, (workspace?.clientHeight ?? window.innerHeight) - element.offsetHeight - 56)
      const next = {
        x: Math.max(12, Math.min(posRef.current.x, maxX)),
        y: Math.max(4, Math.min(posRef.current.y, maxY)),
      }
      if (next.x !== posRef.current.x || next.y !== posRef.current.y) {
        posRef.current = next
        setPos(next)
        updateWindowPosition(id, next.x, next.y)
      }
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [id, size.height, size.width, updateWindowPosition, win?.maximized, win?.open])

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
    if (resizeStartRef.current) {
      const element = windowRef.current
      if (element) {
        updateWindowRect(id, element.offsetLeft, element.offsetTop, element.offsetWidth, element.offsetHeight)
      }
      setDraggingWindow(null)
    }
  }, [id, updateWindowPosition, updateWindowRect, setDraggingWindow])

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
    const workspace = windowRef.current?.offsetParent as HTMLElement | null
    const workspaceWidth = workspace?.clientWidth ?? window.innerWidth
    const workspaceHeight = workspace?.clientHeight ?? window.innerHeight

    const newX = Math.max(0, Math.min(workspaceWidth - 420, dragStart.current.startX + deltaX))
    const newY = Math.max(4, Math.min(workspaceHeight - 280, dragStart.current.startY + deltaY))

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

  function handleResizePointerDown(e: ReactPointerEvent<HTMLElement>, direction: ResizeDirection) {
    e.preventDefault()
    e.stopPropagation()
    const rect = windowRef.current?.getBoundingClientRect()
    const element = windowRef.current
    if (!rect || !element)
      return

    focusWindow(id)
    resizeStartRef.current = {
      direction,
      pointerId: e.pointerId,
      clientX: e.clientX,
      clientY: e.clientY,
      left: element.offsetLeft,
      top: element.offsetTop,
      width: rect.width,
      height: rect.height,
    }
    setDraggingWindow(id)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handleResizePointerMove(e: ReactPointerEvent<HTMLElement>) {
    const start = resizeStartRef.current
    if (!start || start.pointerId !== e.pointerId)
      return

    const deltaX = e.clientX - start.clientX
    const deltaY = e.clientY - start.clientY
    const minWidth = 420
    const minHeight = 280
    const rightEdge = start.left + start.width
    const bottomEdge = start.top + start.height
    const workspace = windowRef.current?.offsetParent as HTMLElement | null
    const maxRight = (workspace?.clientWidth ?? window.innerWidth) - 12
    const maxBottom = (workspace?.clientHeight ?? window.innerHeight) - 56
    let left = start.left
    let top = start.top
    let width = start.width
    let height = start.height

    if (start.direction.includes('e'))
      width = Math.max(minWidth, Math.min(start.width + deltaX, maxRight - start.left))
    if (start.direction.includes('w')) {
      width = Math.max(minWidth, Math.min(start.width - deltaX, rightEdge - 12))
      left = rightEdge - width
    }
    if (start.direction.includes('s'))
      height = Math.max(minHeight, Math.min(start.height + deltaY, maxBottom - start.top))
    if (start.direction.includes('n')) {
      height = Math.max(minHeight, Math.min(start.height - deltaY, bottomEdge - 12))
      top = bottomEdge - height
    }

    const nextPosition = { x: left, y: top }
    posRef.current = nextPosition
    setPos(nextPosition)
    setSize({ width, height })
  }

  function handleResizePointerUp(e: ReactPointerEvent<HTMLElement>) {
    if (!resizeStartRef.current || resizeStartRef.current.pointerId !== e.pointerId)
      return

    resizeStartRef.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    catch {}

    const rect = windowRef.current?.getBoundingClientRect()
    const element = windowRef.current
    if (rect && element) {
      updateWindowRect(id, element.offsetLeft, element.offsetTop, rect.width, rect.height)
      const nextPosition = { x: element.offsetLeft, y: element.offsetTop }
      posRef.current = nextPosition
      setPos(nextPosition)
      setSize({ width: rect.width, height: rect.height })
    }
    setDraggingWindow(null)
  }

  function handleResizeKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    const rect = windowRef.current?.getBoundingClientRect()
    const element = windowRef.current
    if (!rect || !element)
      return

    const step = e.shiftKey ? 32 : 12
    const widthDelta = e.key === 'ArrowRight' ? step : e.key === 'ArrowLeft' ? -step : 0
    const heightDelta = e.key === 'ArrowDown' ? step : e.key === 'ArrowUp' ? -step : 0
    if (!widthDelta && !heightDelta)
      return

    e.preventDefault()
    const workspace = element.offsetParent as HTMLElement | null
    const left = element.offsetLeft
    const top = element.offsetTop
    const width = Math.max(420, Math.min(rect.width + widthDelta, (workspace?.clientWidth ?? window.innerWidth) - left - 12))
    const height = Math.max(280, Math.min(rect.height + heightDelta, (workspace?.clientHeight ?? window.innerHeight) - top - 56))
    setSize({ width, height })
    updateWindowRect(id, left, top, width, height)
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
        width: win.maximized || isMobile ? undefined : size.width ?? defaultWidth,
        height: win.maximized || isMobile ? undefined : size.height ?? defaultHeight,
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

      {!isMobile && !win.maximized && (
        <>
          {resizeHandles.map(({ direction, className }) => (
            <div
              key={direction}
              aria-hidden="true"
              className={`absolute z-30 touch-none ${className}`}
              onPointerCancel={handleResizePointerUp}
              onPointerDown={event => handleResizePointerDown(event, direction)}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              onLostPointerCapture={handleResizePointerUp}
            />
          ))}
          <button
            type="button"
            aria-label={tCommon('resizeWindow')}
            className="absolute bottom-0 right-0 z-30 size-4 touch-none bg-transparent p-0 after:absolute after:bottom-1 after:right-1 after:size-1.5 after:rounded-[1px] after:border-b-2 after:border-r-2 after:border-ph-muted/50 hover:after:border-ph-orange focus-visible:outline-none focus-visible:after:border-ph-orange"
            onKeyDown={handleResizeKeyDown}
            onPointerCancel={handleResizePointerUp}
            onPointerDown={event => handleResizePointerDown(event, 'se')}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            onLostPointerCapture={handleResizePointerUp}
          />
        </>
      )}
    </div>
  )
}
