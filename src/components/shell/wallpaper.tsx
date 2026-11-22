'use client'

import type { AppId } from '@/lib/shell-routes'
import type { VirtualFile } from '@/lib/virtual-file-types'
import {
  ArticleIcon,
  CodeIcon,
  FileTextIcon,
  FolderSimpleIcon,
  MusicNotesIcon,
  NotePencilIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useFinderStore } from '@/components/apps/finder/store'
import { displayName } from '@/components/apps/finder/utils'
import { AppIcon } from '@/components/shell/app-icon'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { isAppId } from '@/lib/shell-routes'
import { openVirtualFile } from '@/lib/virtual-file-actions'
import { useShellStore } from '@/stores/shell-store'
import { DesktopPet } from './desktop-pet'
import { WallpaperScene } from './wallpaper-scene'

function DesktopFileIcon({ file }: { file: VirtualFile }) {
  if (file.kind === 'image' && file.src)
    return <img alt="" className="size-full rounded-[7px] object-cover" src={file.src} />
  if (file.kind === 'app' && file.appId)
    return <AppIcon id={file.appId} size={20} />

  const Icon = file.kind === 'directory'
    ? FolderSimpleIcon
    : file.kind === 'audio'
      ? MusicNotesIcon
      : file.kind === 'note'
        ? NotePencilIcon
        : file.kind === 'blog'
          ? ArticleIcon
          : FileTextIcon

  return <Icon size={20} weight="regular" />
}

type DesktopItem = { file: VirtualFile, id: string } | { id: AppId }

export function ShellWallpaper({ files }: { files: VirtualFile[] }) {
  const wallpaperIndex = useShellStore(state => state.wallpaperIndex)
  const widgetsVisible = useShellStore(state => state.widgetsVisible)
  const petVisible = useShellStore(state => state.petVisible)
  const preferencesHydrated = useShellStore(state => state.preferencesHydrated)
  const openWindow = useShellStore(state => state.openWindow)
  const desktopPaths = useShellStore(state => state.desktopPaths)
  const desktopHydrated = useShellStore(state => state.desktopHydrated)
  const removeDesktopItem = useShellStore(state => state.removeDesktopItem)
  const t = useTranslations('wallpaper')
  const finderT = useTranslations('apps.finder')
  const dockT = useTranslations('dock')
  const router = useRouter()
  const filesByPath = useMemo(() => new Map(files.map(file => [file.path, file])), [files])
  const desktopItems = desktopPaths.flatMap((item): DesktopItem[] => {
    if (item.startsWith('/')) {
      const file = filesByPath.get(item)
      return file ? [{ file, id: file.path }] : []
    }

    return isAppId(item) ? [{ id: item }] : []
  })

  function desktopLabel(file: VirtualFile) {
    if (file.kind === 'app' && file.appId && isAppId(file.appId))
      return dockT(file.appId)
    return displayName(file)
  }

  function openDesktopFile(file: VirtualFile) {
    if (file.kind === 'directory') {
      useFinderStore.getState().requestPath(file.path)
      openWindow('finder')
      return
    }

    openVirtualFile(file, router)
  }

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

      {desktopHydrated && (
        <div className="pointer-events-auto absolute top-4 right-4 z-10 flex max-h-[calc(100%-5.5rem)] w-20 flex-col items-center gap-3.5 overflow-y-auto">
          {desktopItems.map(item => (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <button
                  type="button"
                  onClick={() => 'file' in item ? openDesktopFile(item.file) : openWindow(item.id)}
                  className="group flex w-full flex-col items-center rounded p-1 text-center focus:outline-none"
                >
                  <div className="flex size-11 items-center justify-center overflow-hidden rounded-[8px] border bg-white/50 text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[12px] transition-colors group-hover:border-ph-orange/50 group-hover:text-ph-orange dark:bg-white/5 dark:text-gray-200">
                    {'file' in item ? <DesktopFileIcon file={item.file} /> : <AppIcon id={item.id} size={20} />}
                  </div>
                  <span className="mt-1 max-w-full truncate rounded bg-white/45 px-1.5 py-0.5 font-mono text-[10px] font-medium text-ph-ink backdrop-blur-md transition-colors group-hover:bg-ph-orange group-hover:text-white dark:bg-black/35">
                    {'file' in item ? desktopLabel(item.file) : dockT(item.id)}
                  </span>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => removeDesktopItem(item.id)}>
                  {finderT('removeFromDesktop')}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      )}

    </div>
  )
}
