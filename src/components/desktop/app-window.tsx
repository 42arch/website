'use client'

import type { CSSProperties, ReactNode, PointerEvent as ReactPointerEvent } from 'react'
import type { DesktopWindowState } from './desktop-types'
import { CornersOutIcon } from '@phosphor-icons/react/dist/csr/CornersOut'
import { MinusIcon } from '@phosphor-icons/react/dist/csr/Minus'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { apps } from './app-registry'

export function AppWindow({ window: item, index, active, onFocus, onMove, onClose, onMinimize, onMaximize, children }: {
  window: DesktopWindowState
  index: number
  active: boolean
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  children: ReactNode
}) {
  const element = useRef<HTMLElement>(null)
  const drag = useRef<{ clientX: number, clientY: number, x: number, y: number, left: number, top: number, width: number } | null>(null)
  const app = apps.find(app => app.id === item.id)!

  useEffect(() => {
    if (active && !item.minimized && !document.querySelector('[role="dialog"]'))
      element.current?.focus({ preventScroll: true })
  }, [active, item.minimized])

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || item.maximized || window.matchMedia('(max-width: 700px)').matches || (event.target as HTMLElement).closest('button'))
      return
    const rect = element.current!.getBoundingClientRect()
    drag.current = { clientX: event.clientX, clientY: event.clientY, x: item.x, y: item.y, left: rect.left, top: rect.top, width: rect.width }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current)
      return
    const start = drag.current
    const deltaX = Math.max(12 - start.left, Math.min(event.clientX - start.clientX, window.innerWidth - start.left - start.width - 12))
    const deltaY = Math.max(45 - start.top, Math.min(event.clientY - start.clientY, window.innerHeight - start.top - 155))
    onMove(start.x + deltaX, start.y + deltaY)
  }

  return (
    <section
      ref={element}
      id={`app-window-${item.id}`}
      tabIndex={-1}
      aria-labelledby={`window-title-${item.id}`}
      className={cn(
        'absolute left-[calc(50%-500px)] top-[max(125px,calc(50%-275px))] z-10 flex h-[526px] w-[800px] max-h-[calc(100dvh-158px)] flex-col overflow-hidden rounded-xl border border-white/80 bg-[var(--paper)] shadow-[0_22px_65px_-18px_#22384e40,0_3px_12px_#293b4b12] pointer-events-auto animate-[window-appear_.18s_ease-out_both] [hidden]:!hidden dark:border-white/15 dark:shadow-[0_22px_65px_-18px_#090f18a6,0_3px_12px_#10182080] min-[1600px]:h-[550px] min-[1600px]:w-[860px] max-[1150px]:left-[45px] max-[1150px]:w-[calc(100%-195px)] max-[700px]:left-[14px] max-[700px]:top-[205px] max-[700px]:h-[calc(100%-311px)] max-[700px]:min-h-[250px] max-[700px]:max-h-none max-[700px]:w-[calc(100%-28px)] max-[700px]:!transform-none max-[700px]:rounded-[10px]',
        !active && 'max-[700px]:hidden',
        !active && 'shadow-[0_10px_30px_-15px_#22384e40]',
        item.maximized && 'inset-[54px_18px_106px] !h-auto !w-auto !max-h-none max-[700px]:inset-[56px_12px_104px]',
      )}
      style={{ transform: item.maximized ? undefined : `translate(${item.x}px, ${item.y}px)`, zIndex: index + 10 }}
      hidden={item.minimized}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
      data-app={item.id}
    >
      <div
        className="flex h-[42px] shrink-0 touch-none select-none cursor-grab items-center justify-between border-b border-[var(--line)] bg-[#f2f3ed] px-4 active:cursor-grabbing dark:bg-[var(--paper-muted)] dark:text-[var(--subtle)] max-[700px]:h-[38px] max-[700px]:cursor-default max-[700px]:px-[13px]"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => { drag.current = null }}
        onPointerCancel={() => { drag.current = null }}
        onLostPointerCapture={() => { drag.current = null }}
        onDoubleClick={event => !(event.target as HTMLElement).closest('button') && onMaximize()}
      >
        <div className="group flex w-[76px] gap-0.5 max-[700px]:w-[72px] max-[700px]:gap-0 [&>button]:relative [&>button]:grid [&>button]:size-[26px] [&>button]:place-items-center [&>button]:rounded [&>button]:border-0 [&>button]:bg-transparent [&>button]:text-[#574b3c] [&>button]:before:absolute [&>button]:before:z-0 [&>button]:before:size-3 [&>button]:before:rounded-full [&>button]:before:border [&>button]:before:border-black/5 [&>button]:before:bg-[var(--control-color)] [&>button>svg]:relative [&>button>svg]:z-10 [&>button>svg]:opacity-0 [&:hover>button>svg]:opacity-100 [&:focus-within>button>svg]:opacity-100 [&>button:hover>svg]:opacity-100 max-[700px]:[&>button]:size-7 max-[700px]:[&>button>svg]:opacity-65">
          <button style={{ '--control-color': '#d99382' } as CSSProperties} aria-label={`关闭${app.name}`} title="关闭" onClick={onClose}><XIcon size={10} weight="bold" /></button>
          <button style={{ '--control-color': '#dfc17a' } as CSSProperties} aria-label={`最小化${app.name}`} title="最小化" onClick={onMinimize}><MinusIcon size={10} weight="bold" /></button>
          <button style={{ '--control-color': '#a3b596' } as CSSProperties} aria-label={`${item.maximized ? '还原' : '放大'}${app.name}`} title={item.maximized ? '还原' : '放大'} onClick={onMaximize}><CornersOutIcon size={9} weight="bold" /></button>
        </div>
        <span id={`window-title-${item.id}`} className="flex items-center gap-[7px] text-[11px] tracking-[.01em] text-[#697477] dark:text-[#c1ccca] max-[700px]:text-[10px]">
          <app.icon size={14} />
          {app.file}
        </span>
        <span className="w-[65px] text-right font-mono text-[8px] tracking-[.13em] text-[#9a9e97] max-[700px]:w-12 max-[700px]:text-[6px]">STARLLOW</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto [scrollbar-color:#c3cbc2_transparent] [scrollbar-width:thin]">{children}</div>
      <div className="flex h-7 shrink-0 items-center justify-between border-t border-[var(--line)] bg-[#f3f4ed] px-[15px] text-[9px] tracking-[.025em] text-[#8a938b] dark:bg-[var(--paper-muted)] dark:text-[var(--subtle)] max-[700px]:h-6 max-[700px]:px-3 max-[700px]:text-[8px] [&>span]:flex [&>span]:items-center [&>span]:gap-[6px]">
        <span>
          <span className="inline-block size-[5px] shrink-0 rounded-full bg-[#839a76]" />
          {app.id === 'home' ? '很高兴在这里遇见你' : app.subtitle}
        </span>
        <span className="max-[700px]:hidden">
          用好奇心驱动
          <span className="text-[15px] leading-none">✳</span>
        </span>
      </div>
    </section>
  )
}
