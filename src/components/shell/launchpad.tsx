'use client'

import type { AppId } from '@/lib/shell-routes'
import {
  ArticleIcon,
  BookOpenIcon,
  ChartLineUpIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FolderSimpleIcon,
  GearIcon,
  ImagesIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useShellStore } from '@/stores/shell-store'

const launchpadApps: { id: AppId, icon: typeof FileTextIcon, tone: string }[] = [
  { id: 'readme', icon: FileTextIcon, tone: 'bg-[#f4eee5] text-[#61594f]' },
  { id: 'projects', icon: FolderSimpleIcon, tone: 'bg-[#fff0ce] text-[#c88114]' },
  { id: 'notes', icon: ArticleIcon, tone: 'bg-[#fff0e9] text-ph-orange' },
  { id: 'gallery', icon: ImagesIcon, tone: 'bg-[#f5eaff] text-[#9253c8]' },
  { id: 'handbook', icon: BookOpenIcon, tone: 'bg-[#e8f2ff] text-[#397bc0]' },
  { id: 'contact', icon: EnvelopeSimpleIcon, tone: 'bg-[#e7f4e6] text-[#4b9b50]' },
  { id: 'terminal', icon: TerminalWindowIcon, tone: 'bg-[#252833] text-[#c9f7d0]' },
  { id: 'settings', icon: GearIcon, tone: 'bg-[#e9edf2] text-[#64748b]' },
  { id: 'design', icon: PaletteIcon, tone: 'bg-[#ffe8e2] text-[#e45c45]' },
  { id: 'analytics', icon: ChartLineUpIcon, tone: 'bg-[#e1f4f0] text-[#168c78]' },
]

interface LaunchpadProps {
  open: boolean
  onClose: () => void
}

export function Launchpad({ open, onClose }: LaunchpadProps) {
  const appNames = useTranslations('dock')
  const t = useTranslations('launchpad')
  const openWindow = useShellStore(state => state.openWindow)
  const dockAppIds = useShellStore(state => state.dockAppIds)
  const hydrateDockAppIds = useShellStore(state => state.hydrateDockAppIds)
  const setDockAppIds = useShellStore(state => state.setDockAppIds)
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [contextApp, setContextApp] = useState<AppId | null>(null)

  useEffect(() => {
    hydrateDockAppIds()
  }, [hydrateDockAppIds])

  useEffect(() => {
    if (!open) {
      setContextApp(null)
      setQuery('')
      return
    }

    searchRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open)
      return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (contextApp)
          setContextApp(null)
        else
          onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [contextApp, onClose, open])

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredApps = normalizedQuery
    ? launchpadApps.filter(({ id }) => appNames(id).toLocaleLowerCase().includes(normalizedQuery) || id.includes(normalizedQuery))
    : launchpadApps

  if (!open)
    return null

  function addToDock(id: AppId) {
    if (dockAppIds.includes(id))
      return

    const nextIds = [...dockAppIds, id]
    setDockAppIds(nextIds)
    setContextApp(null)
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-[#171922]/35 pb-20 backdrop-blur-[18px] animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-label={t('title')}
        aria-modal="true"
        className="relative flex h-[calc(100dvh-8rem)] w-full max-w-none flex-col overflow-hidden px-5 pt-6 sm:px-8"
        role="dialog"
      >
        <header className="flex shrink-0 justify-center">
          <InputGroup className="max-w-xs rounded-lg bg-background/75 shadow-sm" onClick={event => event.stopPropagation()}>
            <InputGroupAddon>
              <MagnifyingGlassIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchRef}
              aria-label={t('search')}
              onChange={event => setQuery(event.target.value)}
              placeholder={t('search')}
              value={query}
            />
            <InputGroupAddon align="inline-end" className="hidden sm:flex">
              <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd>
            </InputGroupAddon>
          </InputGroup>
        </header>

        {filteredApps.length > 0
          ? (
              <div className="grid min-h-0 flex-1 grid-cols-3 content-center gap-x-2 gap-y-5 overflow-y-auto py-6 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-8 md:grid-cols-5 lg:grid-cols-6">
                {filteredApps.map(({ id, icon: Icon, tone }) => (
                  <ContextMenu
                    key={id}
                    open={contextApp === id}
                    onOpenChange={nextOpen => setContextApp(nextOpen ? id : null)}
                  >
                    <ContextMenuTrigger asChild>
                      <button
                        className="group flex min-w-0 flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition-colors hover:bg-white/45 focus-visible:ring-2 focus-visible:ring-ph-orange dark:hover:bg-white/5"
                        onClick={() => {
                          openWindow(id)
                          onClose()
                        }}
                        type="button"
                      >
                        <span className={`flex size-14 items-center justify-center rounded-[17px] shadow-[0_8px_18px_-9px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform group-hover:-translate-y-1 group-hover:scale-105 sm:size-[68px] ${tone}`}>
                          <Icon size={30} weight="regular" />
                        </span>
                        <span className="max-w-full truncate text-xs font-medium text-ph-ink sm:text-[13px]">{appNames(id)}</span>
                      </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="rounded-lg" onClick={event => event.stopPropagation()}>
                      <ContextMenuGroup>
                        <ContextMenuItem disabled={dockAppIds.includes(id)} onSelect={() => addToDock(id)}>
                          {dockAppIds.includes(id) ? t('alreadyInDock') : t('addToDock')}
                        </ContextMenuItem>
                      </ContextMenuGroup>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            )
          : <p className="py-16 text-center text-sm text-ph-muted">{t('noResults')}</p>}

      </section>
    </div>
  )
}
