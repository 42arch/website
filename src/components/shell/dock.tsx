'use client'

import {
  ArticleIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  ChartLineUpIcon,
  EnvelopeSimpleIcon,
  FileMagnifyingGlassIcon,
  FolderSimpleIcon,
  GameControllerIcon,
  GearIcon,
  ImagesIcon,
  InfoIcon,
  MusicNotesIcon,
  NotePencilIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useMusicStore } from '@/components/apps/music/store'
import { Launchpad } from '@/components/shell/launchpad'
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useShellStore } from '@/stores/shell-store'

const appIcons = {
  finder: FileMagnifyingGlassIcon,
  bookmarks: BookmarkSimpleIcon,
  projects: FolderSimpleIcon,
  notes: NotePencilIcon,
  blog: ArticleIcon,
  gallery: ImagesIcon,
  music: MusicNotesIcon,
  handbook: BookOpenIcon,
  contact: EnvelopeSimpleIcon,
  terminal: TerminalWindowIcon,
  settings: GearIcon,
  about: InfoIcon,
  analytics: ChartLineUpIcon,
  game: GameControllerIcon,
}

export function ShellDock() {
  const windows = useShellStore(state => state.windows)
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const dockAppIds = useShellStore(state => state.dockAppIds)
  const setDockAppIds = useShellStore(state => state.setDockAppIds)
  const toggleWindow = useShellStore(state => state.toggleWindow)
  const musicPlaying = useMusicStore(state => state.isPlaying)
  const t = useTranslations('dock')
  const launchpadT = useTranslations('launchpad')
  const [launchpadOpen, setLaunchpadOpen] = useState(false)

  const dockApps = dockAppIds.filter(id => id !== 'finder').map(id => ({ id, label: t(id), icon: appIcons[id], isTerminal: id === 'terminal' }))

  return (
    <>
      <nav aria-label="macOS Dock" className="fixed bottom-2.5 left-1/2 z-50 w-max max-w-[calc(100vw-16px)] -translate-x-1/2 select-none">
        <div className="flex max-w-full items-center gap-1 rounded-[10px] border border-black/10 bg-[#EAE6DA] px-2 py-1 shadow-[0_10px_28px_-6px_rgba(20,20,16,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-[#1A1D26] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] sm:gap-2 sm:px-2.5 sm:py-1.5">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={t('finder')}
                  onClick={() => toggleWindow('finder')}
                  className="group relative flex shrink-0 cursor-pointer flex-col items-center transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border bg-white/55 text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[12px] transition-colors group-hover:text-ph-orange dark:bg-white/5 dark:text-gray-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-10 sm:w-10 sm:rounded-[8px]">
                    <FileMagnifyingGlassIcon size={19} weight="regular" />
                  </span>
                  <span className={`mt-1 h-1 w-1 rounded-full ${windows.finder?.open ? 'bg-ph-orange' : 'bg-transparent'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-[11px]" side="top" sideOffset={8}>
                {t('finder')}
              </TooltipContent>
            </Tooltip>
            <div className="mx-0.5 h-5 w-px shrink-0 self-center bg-black/15 dark:bg-white/15 sm:mx-1 sm:h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={launchpadT('title')}
                  aria-pressed={launchpadOpen}
                  className="group relative flex shrink-0 cursor-pointer flex-col items-center transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95"
                  onClick={() => setLaunchpadOpen(open => !open)}
                  type="button"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border bg-white/55 text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[12px] transition-colors group-hover:text-ph-orange dark:bg-white/5 dark:text-gray-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-10 sm:w-10 sm:rounded-[8px]">
                    <SquaresFourIcon size={19} weight="regular" />
                  </span>
                  <span className="mt-1 h-1 w-1 rounded-full bg-ph-orange" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-[11px]" side="top" sideOffset={8}>
                {launchpadT('title')}
              </TooltipContent>
            </Tooltip>
            {dockApps.length > 0 && <div className="mx-0.5 h-5 w-px shrink-0 self-center bg-black/15 dark:bg-white/15 sm:mx-1 sm:h-6" />}
            <div className="no-scrollbar -my-2 flex min-w-0 items-center gap-1 overflow-x-auto py-2 sm:gap-2">
              {dockApps.map((app) => {
                const winState = windows[app.id]
                const isOpen = winState?.open && !winState?.minimized
                const isFocused = activeWindowId === app.id && isOpen
                const Icon = app.icon

                return (
                  <ContextMenu key={app.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ContextMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={() => toggleWindow(app.id)}
                            className="group relative flex shrink-0 flex-col items-center focus:outline-none transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95 cursor-pointer"
                          >
                            <div
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-[6px] sm:rounded-[8px] flex items-center justify-center border transition-colors ${
                                app.isTerminal
                                  ? 'bg-[#1D1F27] text-gray-200 border-white/15 group-hover:text-ph-green'
                                  : 'bg-white/55 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-gray-700 dark:text-gray-200 group-hover:text-ph-orange'
                              }`}
                            >
                              <Icon size={16} weight="regular" className={app.id === 'notes' || app.id === 'blog' || app.id === 'gallery' || app.id === 'music' ? 'text-ph-orange' : undefined} />
                            </div>

                            <span
                              className={`mt-1 h-1 w-1 transition-all ${
                                isFocused
                                  ? 'scale-125 bg-ph-orange'
                                  : app.id === 'music' && musicPlaying
                                    ? 'bg-ph-orange'
                                    : winState?.open
                                      ? 'bg-gray-600 dark:bg-gray-400'
                                      : 'bg-transparent'
                              }`}
                            />
                          </button>
                        </ContextMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent
                        className="font-mono text-[11px]"
                        side="top"
                        sideOffset={8}
                      >
                        {app.label}
                      </TooltipContent>
                    </Tooltip>
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
          </TooltipProvider>
        </div>
      </nav>
      <Launchpad open={launchpadOpen} onClose={() => setLaunchpadOpen(false)} />
    </>
  )
}
