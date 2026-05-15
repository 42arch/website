'use client'

import { DotsThreeIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, Reorder } from 'motion/react'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { notes, writing } from '@/lib/source'
import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/utils'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

export function TabBar() {
  const { openTabs, openTab, closeTab, setOpenTabs, closeAllTabs, closeOtherTabs } = useWorkspaceStore()
  const pathname = usePathname()
  const router = useRouter()
  const activePanel = pathname.slice(1) || 'overview'
  const isMobile = useIsMobile()

  // Sync initial render path to open tabs
  useEffect(() => {
    openTab(activePanel)
  }, [activePanel, openTab])

  function getTabConfig(id: string) {
    // Handle dynamic writing pages from Fumadocs
    if (id.startsWith('writing/')) {
      const slug = id.split('/').slice(1)
      const page = writing.getPage(slug)
      return { label: page?.data.title || slug.at(-1) || id }
    }

    // Handle dynamic notes pages from Fumadocs
    if (id.startsWith('notes/')) {
      const slug = id.split('/').slice(1)
      const page = notes.getPage(slug)
      return { label: page?.data.title || slug.at(-1) || id }
    }

    return PANEL_CONFIG[id as keyof typeof PANEL_CONFIG]
  }

  function handleClose(e: React.MouseEvent, id: string, isActive: boolean) {
    e.stopPropagation()
    closeTab(id)
    if (isActive) {
      const remaining = openTabs.filter(t => t !== id)
      if (remaining.length > 0) {
        router.push(`/${remaining.at(-1)}`)
      }
      else {
        router.push('/overview')
      }
    }
  }

  const tabItems = openTabs.map((id: string) => {
    const config = getTabConfig(id)
    if (!config)
      return null
    const isActive = id === activePanel

    return (
      <div
        key={id}
        className={cn(
          'group relative flex h-full cursor-pointer items-center gap-1.5 border-r border-os-border font-mono text-[11px] transition-colors',
          isMobile ? 'px-3' : 'px-3',
          isActive
            ? 'bg-os-panel text-foreground border-b-2 border-b-os-accent'
            : 'bg-os-toolbar text-muted-foreground hover:bg-os-surface hover:text-foreground border-b-2 border-b-transparent',
        )}
        onClick={() => router.push(`/${id}`)}
      >
        <span className={cn('max-w-[100px] truncate md:max-w-[250px]', isActive && 'font-medium')}>{config.label}</span>
        {openTabs.length > 1 && (
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => handleClose(e, id, isActive)}
            className={cn(
              'flex items-center justify-center rounded-sm transition-colors',
              isMobile ? 'size-6 -mr-1' : 'size-4',
              isActive
                ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                : 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-foreground/10',
              // On mobile, always show close button for active tab
              isMobile && isActive && 'opacity-100',
            )}
          >
            <XIcon size={isMobile ? 12 : 10} weight="bold" />
          </button>
        )}
      </div>
    )
  })

  // Mobile: simple scrollable tab bar without drag reorder
  if (isMobile) {
    return (
      <div
        id="tab-bar"
        className="flex h-9 shrink-0 items-center border-b border-os-border bg-os-toolbar"
      >
        <div className="flex h-full flex-1 items-end overflow-x-auto os-scrollbar">
          <div className="flex h-full shrink-0">
            {tabItems}
          </div>
          <div className="flex-1 border-b-2 border-b-transparent h-full" />
        </div>
        <TabMenu
          onCloseAll={handleCloseAll}
          onCloseOthers={handleCloseOthers}
        />
      </div>
    )
  }

  function handleCloseAll() {
    closeAllTabs()
    router.push('/overview')
  }

  function handleCloseOthers() {
    closeOtherTabs(activePanel)
  }

  // Desktop: draggable reorder tab bar
  return (
    <div
      id="tab-bar"
      className="flex h-8 shrink-0 items-center border-b border-os-border bg-os-toolbar"
    >
      <div className="flex h-full flex-1 items-end overflow-x-auto os-scrollbar">
        <Reorder.Group
          axis="x"
          values={openTabs}
          onReorder={setOpenTabs}
          className="flex h-full shrink-0 m-0 p-0 list-none"
        >
          {openTabs.map((id: string) => {
            const config = getTabConfig(id)
            if (!config)
              return null
            const isActive = id === activePanel

            return (
              <Reorder.Item
                key={id}
                value={id}
                className={cn(
                  'group relative flex h-full cursor-pointer items-center gap-1.5 border-r border-os-border px-3 font-mono text-[11px] transition-colors',
                  isActive
                    ? 'bg-os-panel text-foreground border-b-2 border-b-os-accent'
                    : 'bg-os-toolbar text-muted-foreground hover:bg-os-surface hover:text-foreground border-b-2 border-b-transparent',
                )}
                onClick={() => router.push(`/${id}`)}
              >
                <span className={cn('max-w-[150px] truncate md:max-w-[250px]', isActive && 'font-medium')}>{config.label}</span>
                {openTabs.length > 1 && (
                  <button
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => handleClose(e, id, isActive)}
                    className={cn(
                      'flex size-4 items-center justify-center rounded-sm transition-colors',
                      isActive
                        ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                        : 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-foreground/10',
                    )}
                  >
                    <XIcon size={10} weight="bold" />
                  </button>
                )}
              </Reorder.Item>
            )
          })}
        </Reorder.Group>

        {/* Fill remaining space */}
        <div className="flex-1 border-b-2 border-b-transparent h-full" />
      </div>

      {/* More Actions Dropdown */}
      <div className="flex h-full items-center shrink-0">
        <TabMenu
          onCloseAll={handleCloseAll}
          onCloseOthers={handleCloseOthers}
        />
      </div>
    </div>
  )
}

function TabMenu({ onCloseAll, onCloseOthers }: { onCloseAll: () => void, onCloseOthers: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative h-full" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-full px-2 items-center justify-center text-muted-foreground hover:text-foreground transition-colors border-l border-os-border cursor-pointer',
          isOpen && 'bg-os-surface text-foreground',
        )}
      >
        <DotsThreeIcon size={20} weight="bold" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1 z-50 min-w-[140px] overflow-hidden rounded-sm border border-os-border bg-os-panel p-1 shadow-xl shadow-black/20"
          >
            <button
              onClick={() => {
                onCloseOthers()
                setIsOpen(false)
              }}
              className="flex w-full items-center px-3 py-1.5 text-[11px] font-mono text-muted-foreground hover:bg-os-accent-muted hover:text-os-accent transition-colors text-left cursor-pointer"
            >
              Close Others
            </button>
            <button
              onClick={() => {
                onCloseAll()
                setIsOpen(false)
              }}
              className="flex w-full items-center px-3 py-1.5 text-[11px] font-mono text-muted-foreground hover:bg-os-accent-muted hover:text-os-accent transition-colors text-left cursor-pointer"
            >
              Close All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
