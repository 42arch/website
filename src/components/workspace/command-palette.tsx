'use client'

import {
  ActivityIcon,
  ArticleIcon,
  EnvelopeIcon,
  FlaskIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  ImagesIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  NotepadIcon,
  RssIcon,
  XIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/utils'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number, weight?: 'regular' | 'fill' | 'bold' | 'duotone' }>> = {
  house: HouseIcon,
  folder: FolderIcon,
  flask: FlaskIcon,
  article: ArticleIcon,
  images: ImagesIcon,
  notepad: NotepadIcon,
  activity: ActivityIcon,
  info: InfoIcon,
  rss: RssIcon,
  envelope: EnvelopeIcon,
  gear: GearIcon,
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, openTab } = useWorkspaceStore()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  const allItems = useMemo(() => {
    return (Object.entries(PANEL_CONFIG)).map(([id, config]) => ({
      id,
      label: config.label,
      icon: config.icon,
      action: () => {
        openTab(id)
        router.push(id === 'overview' ? '/' : `/${id}`)
        setCommandPaletteOpen(false)
      },
    }))
  }, [openTab, router, setCommandPaletteOpen])

  const filteredItems = useMemo(() => {
    if (!query)
      return allItems
    return allItems.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, allItems])

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  // Focus input when open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandPaletteOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, filteredItems.length - 1))
      }
      else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      }
      else if (e.key === 'Enter') {
        e.preventDefault()
        filteredItems[selectedIndex]?.action()
      }
    },
    [filteredItems, selectedIndex],
  )

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            id="command-palette"
            initial={isMobile
              ? { opacity: 0, y: 40 }
              : { opacity: 0, y: -20, scale: 0.98 }}
            animate={isMobile
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile
              ? { opacity: 0, y: 40 }
              : { opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'fixed z-50 overflow-hidden bg-os-panel shadow-2xl',
              isMobile
                ? 'inset-0 flex flex-col'
                : 'left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 rounded-lg border border-os-border',
            )}
          >
            {/* Search input */}
            <div className={cn(
              'flex items-center gap-2 border-b border-os-border',
              isMobile ? 'px-4 py-4' : 'px-4 py-3',
            )}
            >
              <MagnifyingGlassIcon size={isMobile ? 20 : 16} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className={cn(
                  'flex-1 bg-transparent font-mono text-foreground outline-none placeholder:text-muted-foreground/60',
                  isMobile ? 'text-sm' : 'text-xs',
                )}
              />
              {isMobile
                ? (
                    <button
                      onClick={() => setCommandPaletteOpen(false)}
                      className="flex size-8 items-center justify-center rounded-sm text-muted-foreground active:bg-os-accent-muted"
                    >
                      <XIcon size={18} weight="bold" />
                    </button>
                  )
                : (
                    <kbd className="rounded border border-os-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ESC
                    </kbd>
                  )}
            </div>

            {/* Results */}
            <div className={cn(
              'overflow-y-auto',
              isMobile ? 'flex-1 p-3' : 'max-h-72 p-2',
            )}
            >
              <div className={cn(
                'mb-1 px-2 font-mono font-semibold tracking-wider text-muted-foreground',
                isMobile ? 'text-[11px]' : 'text-[10px]',
              )}
              >
                NAVIGATE
              </div>
              {filteredItems.length === 0 && (
                <div className="px-2 py-4 text-center font-mono text-xs text-muted-foreground">
                  No results found
                </div>
              )}
              {filteredItems.map((item, index) => {
                const Icon = ICON_MAP[item.icon]
                const isSelected = index === selectedIndex
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'flex w-full items-center text-xs gap-3 rounded-sm text-left transition-colors',
                      isMobile ? 'px-3 py-3.5' : 'px-2 py-2',
                      isSelected
                        ? 'bg-os-accent-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {Icon && <Icon size={isMobile ? 18 : 16} weight={isSelected ? 'fill' : 'regular'} />}
                    <span>{item.label}</span>
                    {isSelected && !isMobile && (
                      <span className="ml-auto font-mono text-[10px] text-os-accent">↵</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Footer — desktop only */}
            {!isMobile && (
              <div className="flex items-center text-xs justify-between border-t border-os-border px-4 py-2">
                <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-os-border bg-background px-1 py-0.5 text-[9px]">↑</kbd>
                    <kbd className="rounded border border-os-border bg-background px-1 py-0.5 text-[9px]">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-os-border bg-background px-1 py-0.5 text-[9px]">↵</kbd>
                    select
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
