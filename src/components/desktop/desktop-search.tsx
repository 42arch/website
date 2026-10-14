'use client'

import type { RefObject } from 'react'
import type { AppId } from './app-registry'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { useRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { AppIcon } from './app-icon'
import { apps } from './app-registry'

export function DesktopSearch({ open, onOpenChange, query, onQueryChange, onChoose, searchButtonRef, container }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (query: string) => void
  onChoose: (id: AppId) => void
  searchButtonRef: RefObject<HTMLButtonElement | null>
  container: HTMLElement | null
}) {
  const destination = useRef<AppId | null>(null)
  const filteredApps = apps.filter(app => `${app.name} ${app.file} ${app.subtitle}`.toLowerCase().includes(query.toLowerCase().trim()))
  function chooseApp(id: AppId) {
    destination.current = id
    onChoose(id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        container={container}
        overlayClassName="absolute inset-0 z-[200] bg-[#263b4d35] backdrop-blur-[7px]"
        showCloseButton={false}
        className="absolute left-1/2 top-[19%] z-[201] flex max-h-[70%] w-[min(520px,calc(100%-36px))] max-w-none -translate-x-1/2 translate-y-0 flex-col gap-0 overflow-auto rounded-[13px] border border-white/60 bg-[var(--paper)] p-0 shadow-[0_20px_80px_#273c5a40] ring-0 sm:max-w-none max-[700px]:top-[100px]"
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          if (destination.current)
            document.getElementById(`app-window-${destination.current}`)?.focus({ preventScroll: true })
          else
            searchButtonRef.current?.focus()
          destination.current = null
        }}
      >
        <DialogTitle className="sr-only">搜索桌面应用</DialogTitle>
        <DialogDescription className="sr-only">输入应用名称，点击结果或按回车打开第一个结果。</DialogDescription>
        <div className="flex items-center gap-[14px] border-b border-[var(--line)] p-5 text-[var(--subtle)]">
          <MagnifyingGlassIcon className="size-6" size={24} />
          <input
            aria-label="搜索应用名称"
            className="w-0 flex-1 bg-transparent text-base text-[var(--ink)] outline-none"
            placeholder="想去哪里看看？"
            value={query}
            onChange={event => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && filteredApps[0])
                chooseApp(filteredApps[0].id)
            }}
          />
          <DialogClose aria-label="关闭搜索"><kbd className="rounded border border-[var(--line)] px-[5px] py-[3px] text-[9px]">ESC</kbd></DialogClose>
        </div>
        <div className="p-2 [&>button]:flex [&>button]:w-full [&>button]:items-center [&>button]:gap-[13px] [&>button]:rounded-[7px] [&>button]:p-[10px] [&>button]:text-left [&>button:hover]:bg-[var(--paper-muted)] [&>button:focus-visible]:bg-[var(--paper-muted)] [&>button>span:nth-child(2)]:flex [&>button>span:nth-child(2)]:flex-1 [&>button>span:nth-child(2)]:flex-col [&>button>span:nth-child(2)]:gap-1 [&>button>span:nth-child(2)>strong]:text-xs [&>button>span:nth-child(2)>strong]:font-medium [&>button>span:nth-child(2)>span]:text-[10px] [&>button>span:nth-child(2)>span]:text-[var(--subtle)] [&>button>svg]:text-[#8a9989]">
          {filteredApps.length
            ? filteredApps.map(app => (
                <button key={app.id} onClick={() => chooseApp(app.id)}>
                  <AppIcon id={app.id} small />
                  <span>
                    <strong>{app.name}</strong>
                    <span>{app.subtitle}</span>
                  </span>
                  <ArrowRightIcon size={20} />
                </button>
              ))
            : <p className="p-[22px] text-xs text-[var(--subtle)]">没有找到这个应用，试试「作品」或「随手记」。</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
