'use client'

import type { AppId } from './app-registry'
import { AsteriskIcon } from '@phosphor-icons/react/dist/csr/Asterisk'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { useLocale } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { apps } from './app-registry'
import { DesktopClock } from './desktop-clock'
import { DeviceStatus } from './device-status'

export function DesktopMenubar({ activeApp, onOpen, onSearch }: {
  activeApp: AppId | undefined
  onOpen: (id: AppId) => void
  onSearch: () => void
}) {
  const locale = useLocale()

  return (
    <header className="relative z-[100] flex h-8 items-center justify-between gap-[15px] border-b border-white/45 bg-[#eef1eac9] px-[27px] backdrop-blur-[22px] dark:border-white/10 dark:bg-[#1c2931dc] max-[850px]:px-[17px] max-[700px]:px-4 max-[420px]:gap-2 max-[420px]:px-[10px]">
      <div className="flex items-center gap-5 max-[850px]:gap-[13px] max-[700px]:gap-3 max-[420px]:gap-2">
        <div className="flex items-center gap-[9px]">
          <button
            className="grid size-7 place-items-center rounded-full bg-transparent text-[#293b4b] transition hover:rotate-12 hover:bg-white/35 hover:text-[#345c87] dark:text-[#e5e9e7] dark:hover:bg-white/10 max-[700px]:size-[26px]"
            onClick={() => onOpen('settings')}
            aria-label={locale === 'zh' ? '打开设置' : 'Open settings'}
          >
            <AsteriskIcon className="size-[22px] max-[700px]:size-5" size={22} weight="bold" />
          </button>
          <strong className="text-xs tracking-[-.35px] max-[700px]:text-[13px]">
            Starllow
          </strong>
        </div>
        {activeApp && (
          <>
            <Separator decorative orientation="vertical" className="h-[14px] w-px bg-[#79878a45] max-[700px]:h-[13px]" />
            <span className="min-w-[38px] text-xs font-semibold max-[700px]:text-[11px]">{apps.find(app => app.id === activeApp)?.name}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-[17px] max-[850px]:gap-[13px] max-[420px]:gap-2">
        <button className="flex items-center gap-[7px]" aria-label="搜索应用" title="搜索应用（⌘ / Ctrl + K）" onClick={onSearch}>
          <MagnifyingGlassIcon size={17} />
          <kbd className="text-[10px] opacity-60 max-[850px]:hidden">⌘ K</kbd>
        </button>
        <DeviceStatus />
        <DesktopClock />
      </div>
    </header>
  )
}
