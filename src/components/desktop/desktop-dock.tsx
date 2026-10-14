'use client'

import type { AppId } from './app-registry'
import { SquaresFourIcon } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { AppIcon } from './app-icon'
import { apps } from './app-registry'

export function DesktopDock({ openWindows, activeApp, onOpen, onShowDesktop }: {
  openWindows: AppId[]
  activeApp: AppId | undefined
  onOpen: (id: AppId) => void
  onShowDesktop: () => void
}) {
  return (
    <TooltipProvider delayDuration={250}>
      <div className="absolute bottom-[22px] left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-[14px] max-[700px]:bottom-[max(16px,env(safe-area-inset-bottom))]">
        <span className="text-[10px] tracking-[.1em] text-[#344d61af] [text-shadow:0_1px_3px_#e0e8e12e] dark:text-[#e0e7e2] max-[700px]:hidden">随便逛逛，这里没有标准路线。</span>
        <nav className="flex items-end gap-[13px] rounded-[21px] border border-[#f4f7f1ad] bg-[#e6ede44f] px-[15px] pb-1 pt-[10px] shadow-[0_6px_16px_#2a41571a,inset_0_1px_0_#ffffff5c] backdrop-blur-2xl dark:border-white/20 dark:bg-[#1a293766] dark:shadow-[0_6px_18px_#090f1855,inset_0_1px_0_#ffffff20] max-[700px]:gap-[10px] max-[700px]:rounded-[18px] max-[700px]:px-3 max-[700px]:pt-[10px]" id="desktop-dock" aria-label="应用 Dock">
          {apps.map(app => (
            <Tooltip key={app.id}>
              <TooltipTrigger asChild>
                <button id={`dock-${app.id}`} className="group relative flex origin-bottom flex-col items-center transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:scale-[1.09] max-[700px]:hover:transform-none [&:has(+button:hover)]:-translate-y-[3px] [&:has(+button:hover)]:scale-[1.03] [&:hover+button]:-translate-y-[3px] [&:hover+button]:scale-[1.03] max-[700px]:[&:has(+button:hover)]:transform-none max-[700px]:[&:hover+button]:transform-none" onClick={() => onOpen(app.id)} aria-label={app.name} aria-current={activeApp === app.id ? 'page' : undefined}>
                  <AppIcon id={app.id} className="max-[700px]:!h-10 max-[700px]:!w-10 max-[700px]:!rounded-[10px] max-[700px]:[&>svg]:!h-[25px] max-[700px]:[&>svg]:!w-[25px]" />
                  <span className={cn('my-[5px] mb-px h-1 w-1 rounded-full', openWindows.includes(app.id) ? 'bg-[#6c819094]' : 'bg-transparent', activeApp === app.id && 'bg-[#3e596f]')} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="z-[120] whitespace-nowrap rounded-[5px] border border-white/50 bg-[#eef2eae8] px-[10px] py-1.5 text-[10px] text-[#293b4b] shadow-[0_3px_8px_#24374510] dark:border-white/20 dark:bg-[#202c34ed] dark:text-[#e5e9e7]" side="top" sideOffset={8}>{app.name}</TooltipContent>
            </Tooltip>
          ))}
          <Separator decorative orientation="vertical" className="mb-[15px] h-[38px] w-px bg-[#f4f8ee77] max-[700px]:hidden" />
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="group relative flex origin-bottom flex-col items-center transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:scale-[1.09] max-[700px]:hidden" aria-label="显示桌面" onClick={onShowDesktop}>
                <span className="inline-flex size-[53px] items-center justify-center rounded-[13px] border border-[#edf2ed88] bg-[#eaf0eb66] text-[#486479] shadow-[inset_0_1px_1px_#ffffff6f] [&>svg]:size-[31px]"><SquaresFourIcon weight="duotone" /></span>
                <span className="my-[5px] mb-px h-1 w-1 rounded-full bg-transparent" />
              </button>
            </TooltipTrigger>
              <TooltipContent className="z-[120] whitespace-nowrap rounded-[5px] border border-white/50 bg-[#eef2eae8] px-[10px] py-1.5 text-[10px] text-[#293b4b] shadow-[0_3px_8px_#24374510] dark:border-white/20 dark:bg-[#202c34ed] dark:text-[#e5e9e7]" side="top" sideOffset={8}>显示桌面</TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </TooltipProvider>
  )
}
