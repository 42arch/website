'use client'

import { XIcon } from '@phosphor-icons/react'
import { Reorder } from 'motion/react'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ARTICLES } from '@/lib/articles'
import { cn } from '@/lib/utils'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

export function TabBar() {
  const { openTabs, openTab, closeTab, setOpenTabs } = useWorkspaceStore()
  const pathname = usePathname()
  const router = useRouter()
  const activePanel = pathname.slice(1) || 'overview'

  // Sync initial render path to open tabs
  useEffect(() => {
    openTab(activePanel)
  }, [activePanel, openTab])

  return (
    <div
      id="tab-bar"
      className="flex h-8 shrink-0 items-end gap-0 overflow-x-auto border-b border-os-border bg-os-toolbar os-scrollbar"
    >
      <Reorder.Group
        axis="x"
        values={openTabs}
        onReorder={setOpenTabs}
        className="flex h-full shrink-0 m-0 p-0 list-none"
      >
        {openTabs.map((id: string) => {
          let config
          if (id.startsWith('writing/')) {
            const articleId = id.split('/')[1]
            const article = ARTICLES.find(a => a.id === articleId)
            config = { label: article?.title || articleId }
          }
          else {
            config = PANEL_CONFIG[id as keyof typeof PANEL_CONFIG]
          }

          if (!config)
            return null
          const isActive = id === activePanel

          return (
            <Reorder.Item
              key={id}
              value={id}
              className={cn(
                'group relative flex h-full cursor-pointer items-center gap-1.5 border-r border-os-border px-3 font-mono text-[11px] transition-colors',
                isActive
                  ? 'bg-os-panel text-foreground border-b-2 border-b-os-accent'
                  : 'bg-os-toolbar text-muted-foreground hover:bg-os-surface hover:text-foreground border-b-2 border-b-transparent',
              )}
              onClick={() => router.push(`/${id}`)}
            >
              <span className={cn('max-w-[150px] truncate md:max-w-[250px]', isActive && 'font-medium')}>{config.label}</span>
              {openTabs.length > 1 && (
                <button
                  onPointerDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(id)
                    // if closing active, navigate to another
                    if (isActive) {
                      const remaining = openTabs.filter(t => t !== id)
                      if (remaining.length > 0) {
                        router.push(`/${remaining.at(-1)}`)
                      }
                      else {
                        router.push('/overview')
                      }
                    }
                  }}
                  className={cn(
                    'flex size-4 items-center justify-center rounded-sm transition-colors',
                    isActive
                      ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                      : 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-foreground/10',
                  )}
                >
                  <XIcon size={10} weight="bold" />
                </button>
              )}
            </Reorder.Item>
          )
        })}
      </Reorder.Group>

      {/* Fill remaining space */}
      <div className="flex-1 border-b-2 border-b-transparent h-full" />
    </div>
  )
}
