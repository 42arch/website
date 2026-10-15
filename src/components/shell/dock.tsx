'use client'

import type { AppId } from '@/lib/shell-routes'
import type { ReactNode } from 'react'
import {
  ArticleIcon,
  BookOpenIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FolderSimpleIcon,
  GearIcon,
  ImagesIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useShellStore } from '@/stores/shell-store'

interface DockAppItem {
  id: AppId
  label: string
  icon: ReactNode
  isTerminal?: boolean
}

export function ShellDock() {
  const windows = useShellStore(state => state.windows)
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const toggleWindow = useShellStore(state => state.toggleWindow)
  const t = useTranslations('dock')

  const dockApps: DockAppItem[] = [
    {
      id: 'readme',
      label: t('readme'),
      icon: <FileTextIcon size={16} weight="regular" />,
    },
    {
      id: 'projects',
      label: t('projects'),
      icon: <FolderSimpleIcon size={16} weight="regular" />,
    },
    {
      id: 'notes',
      label: t('notes'),
      icon: <ArticleIcon size={16} weight="regular" className="text-ph-orange" />,
    },
    {
      id: 'gallery',
      label: t('gallery'),
      icon: <ImagesIcon size={16} weight="regular" className="text-ph-orange" />,
    },
    {
      id: 'handbook',
      label: t('handbook'),
      icon: <BookOpenIcon size={16} weight="regular" />,
    },
    {
      id: 'contact',
      label: t('contact'),
      icon: <EnvelopeSimpleIcon size={16} weight="regular" />,
    },
    {
      id: 'terminal',
      label: t('terminal'),
      isTerminal: true,
      icon: <TerminalWindowIcon size={16} weight="regular" />,
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: <GearIcon size={16} weight="regular" />,
    },
  ]

  return (
    <nav aria-label="macOS Dock" className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-50 select-none max-w-[calc(100vw-16px)]">
      <div className="rounded-[10px] px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 bg-[#EAE6DA] dark:bg-[#1A1D26] border border-black/10 dark:border-white/10 shadow-[0_10px_28px_-6px_rgba(20,20,16,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]">
        {dockApps.map((app, index) => {
          const winState = windows[app.id]
          const isOpen = winState?.open && !winState?.minimized
          const isFocused = activeWindowId === app.id && isOpen

          return (
            <div key={app.id} className="flex items-center shrink-0">
              {/* Divider before terminal */}
              {index === 5 && (
                <div className="h-5 sm:h-6 w-px bg-black/15 dark:bg-white/15 mx-0.5 sm:mx-1 self-center" />
              )}

              <button
                type="button"
                onClick={() => toggleWindow(app.id)}
                className="group relative flex flex-col items-center focus:outline-none transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 active:scale-95 cursor-pointer"
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
                      : 'border-ph-border bg-white/55 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-gray-700 dark:text-gray-200 group-hover:text-ph-orange'
                  }`}
                >
                  {app.icon}
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
            </div>
          )
        })}
      </div>
    </nav>
  )
}
