'use client'

import {
  ArticleIcon,
  CodeIcon,
  FolderSimpleIcon,
  GearIcon,
  ImagesIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useShellStore } from '@/stores/shell-store'
import { DesktopPet } from './desktop-pet'
import { WallpaperScene } from './wallpaper-scene'

export function ShellWallpaper() {
  const wallpaperIndex = useShellStore(state => state.wallpaperIndex)
  const widgetsVisible = useShellStore(state => state.widgetsVisible)
  const petVisible = useShellStore(state => state.petVisible)
  const preferencesHydrated = useShellStore(state => state.preferencesHydrated)
  const openWindow = useShellStore(state => state.openWindow)
  const t = useTranslations('wallpaper')

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none">
      {/* ================= LAYERED WALLPAPER ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <WallpaperScene key={wallpaperIndex} index={wallpaperIndex} interactive />
      </div>

      {preferencesHydrated && petVisible && <DesktopPet />}

      {/* ================= OPTIONAL DESKTOP STATUS WIDGET ================= */}
      {widgetsVisible && (
        <div className="hidden xl:flex flex-col gap-2.5 absolute top-4 left-4 w-56 z-10 pointer-events-auto">
          <div className="rounded-[8px] border bg-ph-surface backdrop-blur-[22px] saturate-[145%] shadow-mac dark:shadow-mac-dark p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ph-muted font-semibold">STATUS</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-green-700 dark:text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-ph-green animate-live-dot" />
                {t('online')}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-ph-orange/10 border border-ph-orange/20 flex items-center justify-center text-ph-orange shrink-0">
                <CodeIcon size={16} weight="bold" />
              </div>
              <div>
                <div className="font-bold text-xs text-ph-ink">{t('workspaceName')}</div>
                <div className="text-[10px] text-ph-muted font-mono">{t('workspaceDescription')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOP-RIGHT ALIAS SHORTCUT ICONS ================= */}
      <div className="hidden sm:flex flex-col items-center gap-3.5 absolute top-4 right-4 z-10 w-20 pointer-events-auto">
        {/* Alias 1: Blog.app */}
        <button
          type="button"
          onClick={() => openWindow('blog')}
          className="group flex flex-col items-center text-center p-1 rounded focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] text-gray-700 dark:text-gray-200 group-hover:border-ph-orange/50 group-hover:text-ph-orange group-hover:-translate-y-0.5 transition-all">
            <ArticleIcon size={20} weight="regular" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-ph-ink bg-white/45 dark:bg-black/35 backdrop-blur-md group-hover:bg-ph-orange group-hover:text-white transition-colors">
            Blog.app
          </span>
        </button>

        {/* Alias 2: Projects.app */}
        <button
          type="button"
          onClick={() => openWindow('projects')}
          className="group flex flex-col items-center text-center p-1 rounded focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] text-gray-700 dark:text-gray-200 group-hover:border-ph-orange/50 group-hover:text-ph-orange group-hover:-translate-y-0.5 transition-all">
            <FolderSimpleIcon size={20} weight="regular" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-ph-ink bg-white/45 dark:bg-black/35 backdrop-blur-md group-hover:bg-ph-orange group-hover:text-white transition-colors">
            Projects
          </span>
        </button>

        {/* Alias 3: Albums */}
        <button
          type="button"
          onClick={() => openWindow('gallery')}
          className="group flex flex-col items-center text-center p-1 rounded focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] text-ph-orange group-hover:border-ph-orange/50 group-hover:-translate-y-0.5 transition-all">
            <ImagesIcon size={20} weight="regular" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-ph-orange bg-white/45 dark:bg-black/35 backdrop-blur-md group-hover:bg-ph-orange group-hover:text-white transition-colors">
            Albums
          </span>
        </button>

        {/* Alias 4: Settings.app */}
        <button
          type="button"
          onClick={() => openWindow('settings')}
          className="group flex flex-col items-center text-center p-1 rounded focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] text-gray-700 dark:text-gray-200 group-hover:border-ph-orange/50 group-hover:text-ph-orange group-hover:-translate-y-0.5 transition-all">
            <GearIcon size={20} weight="regular" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-ph-ink bg-white/45 dark:bg-black/35 backdrop-blur-md group-hover:bg-ph-orange group-hover:text-white transition-colors">
            Settings
          </span>
        </button>
      </div>
    </div>
  )
}
