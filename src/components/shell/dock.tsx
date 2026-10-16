'use client'

import {
  ArticleIcon,
  BookOpenIcon,
  ChartLineUpIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FolderSimpleIcon,
  GearIcon,
  ImagesIcon,
  InfoIcon,
  PaletteIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Launchpad } from '@/components/shell/launchpad'
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { useShellStore } from '@/stores/shell-store'

const appIcons = {
  readme: FileTextIcon,
  projects: FolderSimpleIcon,
  notes: ArticleIcon,
  gallery: ImagesIcon,
  handbook: BookOpenIcon,
  contact: EnvelopeSimpleIcon,
  terminal: TerminalWindowIcon,
  settings: GearIcon,
  about: InfoIcon,
  design: PaletteIcon,
  analytics: ChartLineUpIcon,
}

export function ShellDock() {
  const windows = useShellStore(state => state.windows)
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const dockAppIds = useShellStore(state => state.dockAppIds)
  const setDockAppIds = useShellStore(state => state.setDockAppIds)
  const toggleWindow = useShellStore(state => state.toggleWindow)
  const t = useTranslations('dock')
  const launchpadT = useTranslations('launchpad')
  const [launchpadOpen, setLaunchpadOpen] = useState(false)

  const dockApps = dockAppIds.map(id => ({ id, label: t(id), icon: appIcons[id], isTerminal: id === 'terminal' }))

  return (
    <>
      <nav aria-label="macOS Dock" className="fixed bottom-2.5 left-1/2 z-50 w-max max-w-[calc(100vw-16px)] -translate-x-1/2 select-none">
        <div className="flex max-w-full items-center gap-1 rounded-[10px] border border-black/10 bg-[#EAE6DA] px-2 py-1 shadow-[0_10px_28px_-6px_rgba(20,20,16,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-[#1A1D26] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] sm:gap-2 sm:px-2.5 sm:py-1.5">
          <button
            aria-label={launchpadT('title')}
            aria-pressed={launchpadOpen}
            className="group relative flex shrink-0 cursor-pointer flex-col items-center transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95"
            onClick={() => setLaunchpadOpen(open => !open)}
            title={launchpadT('title')}
            type="button"
          >
            <span className="absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#1D1F27]/90 px-2 py-0.5 font-mono text-[11px] text-[#F5F4EC] opacity-0 shadow-md transition-opacity group-hover:opacity-100">{launchpadT('title')}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border bg-white/55 text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[12px] transition-colors group-hover:text-ph-orange dark:bg-white/5 dark:text-gray-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-10 sm:w-10 sm:rounded-[8px]">
              <SquaresFourIcon size={19} weight="regular" />
            </span>
            <span className="mt-1 h-1 w-1 rounded-full bg-ph-orange" />
          </button>
          {dockApps.length > 0 && <div className="mx-0.5 h-5 w-px shrink-0 self-center bg-black/15 dark:bg-white/15 sm:mx-1 sm:h-6" />}
          <div className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto sm:gap-2">
            {dockApps.map((app) => {
              const winState = windows[app.id]
              const isOpen = winState?.open && !winState?.minimized
              const isFocused = activeWindowId === app.id && isOpen
              const Icon = app.icon

              return (
                <ContextMenu key={app.id}>
                  <ContextMenuTrigger asChild>
                    <button
                      type="button"
                      onClick={() => toggleWindow(app.id)}
                      className="group relative flex shrink-0 flex-col items-center focus:outline-none transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      {/* Tooltip */}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-[4px] bg-[#1D1F27]/90 dark:bg-black/90 backdrop-blur-md text-[#F5F4EC] text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                        {app.label}
                      </span>

                      {/* Icon Squircle */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-[6px] sm:rounded-[8px] flex items-center justify-center border transition-colors ${
                          app.isTerminal
                            ? 'bg-[#1D1F27] text-gray-200 border-white/15 group-hover:text-ph-green'
                            : 'bg-white/55 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-gray-700 dark:text-gray-200 group-hover:text-ph-orange'
                        }`}
                      >
                        <Icon size={16} weight="regular" className={app.id === 'notes' || app.id === 'gallery' ? 'text-ph-orange' : undefined} />
                      </div>

                      {/* State Dot Indicator */}
                      <span
                        className={`w-1 h-1 rounded-full mt-1 transition-all ${
                          isFocused
                            ? 'bg-ph-orange scale-125'
                            : winState?.open
                              ? 'bg-gray-600 dark:bg-gray-400'
                              : 'bg-transparent'
                        }`}
                      />
                    </button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="rounded-lg">
                    <ContextMenuGroup>
                      <ContextMenuItem onSelect={() => setDockAppIds(dockAppIds.filter(id => id !== app.id))}>
                        {t('removeFromDock')}
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuContent>
                </ContextMenu>
              )
            })}
          </div>
        </div>
      </nav>
      <Launchpad open={launchpadOpen} onClose={() => setLaunchpadOpen(false)} />
    </>
  )
}
