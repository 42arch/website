'use client'

import {
  CodeIcon,
  FileTextIcon,
  FolderSimpleIcon,
  GearIcon,
  ImagesIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { cartoonWallpapers, useShellStore } from '@/stores/shell-store'
import { WallpaperScene } from './wallpaper-scene'

export function ShellWallpaper() {
  const wallpaperIndex = useShellStore(state => state.wallpaperIndex)
  const mascotBubbleVisible = useShellStore(state => state.mascotBubbleVisible)
  const mascotQuoteIndex = useShellStore(state => state.mascotQuoteIndex)
  const cycleMascotQuote = useShellStore(state => state.cycleMascotQuote)
  const widgetsVisible = useShellStore(state => state.widgetsVisible)
  const openWindow = useShellStore(state => state.openWindow)
  const t = useTranslations('wallpaper')

  const activeMascot = cartoonWallpapers[wallpaperIndex] || cartoonWallpapers[0]
  const currentQuote = activeMascot.quotes[mascotQuoteIndex % activeMascot.quotes.length]

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none">
      {/* ================= VECTOR CARTOON WALLPAPERS ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <WallpaperScene index={wallpaperIndex} />
      </div>

      {/* ================= MASCOT SPEECH BUBBLE ================= */}
      {mascotBubbleVisible && (
        <div className="hidden md:flex flex-col items-end absolute bottom-20 right-28 z-10 pointer-events-auto">
          <button
            type="button"
            onClick={cycleMascotQuote}
            className="rounded-[6px] border bg-ph-surface backdrop-blur-[22px] saturate-[145%] shadow-mac dark:shadow-mac-dark relative px-3.5 py-2.5 text-xs max-w-[260px] text-left hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ph-orange">
                {activeMascot.tag}
              </span>
              <span className="text-[10px] font-mono text-ph-muted">{t('cycleQuote')}</span>
            </div>
            <p className="leading-relaxed text-ph-ink text-[11px]">
              {currentQuote}
            </p>
          </button>
        </div>
      )}

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
                <div className="font-bold text-xs text-ph-ink">Alex Chen</div>
                <div className="text-[10px] text-ph-muted font-mono">Product Engineer</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOP-RIGHT ALIAS SHORTCUT ICONS ================= */}
      <div className="hidden sm:flex flex-col items-center gap-3.5 absolute top-4 right-4 z-10 w-20 pointer-events-auto">
        {/* Alias 1: README.mdx */}
        <button
          type="button"
          onClick={() => openWindow('readme')}
          className="group flex flex-col items-center text-center p-1 rounded focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] text-gray-700 dark:text-gray-200 group-hover:border-ph-orange/50 group-hover:text-ph-orange group-hover:-translate-y-0.5 transition-all">
            <FileTextIcon size={20} weight="regular" />
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-ph-ink bg-white/45 dark:bg-black/35 backdrop-blur-md group-hover:bg-ph-orange group-hover:text-white transition-colors">
            README.mdx
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
