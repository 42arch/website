'use client'

import { ArrowSquareOutIcon, FolderSimpleIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useProjectsStore } from '@/components/apps/projects/store'
import { ShellWindow } from '@/components/shell/window'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { projectsData } from '@/lib/shell-content'
import { useShellStore } from '@/stores/shell-store'

const projectFilters = ['all', 'shipped', 'in-progress', 'archived'] as const
const statusStyles = {
  'shipped': 'bg-green-500/10 text-green-700 dark:text-green-300',
  'in-progress': 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  'archived': 'bg-black/[0.04] text-ph-muted dark:bg-white/[0.06]',
} as const

export function ProjectsApp() {
  const t = useTranslations('apps.projects')
  const filter = useProjectsStore(state => state.filter)
  const selectedProjectTitle = useProjectsStore(state => state.selectedProjectTitle)
  const setFilter = useProjectsStore(state => state.setFilter)
  const projectsWindowOpen = useShellStore(state => state.windows.projects.open && !state.windows.projects.minimized)
  const projectRefs = useRef(new Map<string, HTMLDivElement>())

  const filteredProjects = projectsData.filter(project => filter === 'all' || project.status === filter)

  useEffect(() => {
    if (selectedProjectTitle)
      projectRefs.current.get(selectedProjectTitle)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [projectsWindowOpen, selectedProjectTitle])

  return (
    <ShellWindow
      id="projects"
      title={t('title')}
      icon={<FolderSimpleIcon size={14} weight="regular" className="text-ph-muted" />}
      defaultWidth="min(740px, 94vw)"
      defaultHeight="min(510px, 75vh)"
      defaultLeft={160}
      defaultTop={58}
      headerCenter={(
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => {
            const nextFilter = projectFilters.find(item => item === value)
            if (nextFilter)
              setFilter(nextFilter)
          }}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label={t('title')}
        >
          {projectFilters.map(item => <ToggleGroupItem key={item} value={item}>{t(item)}</ToggleGroupItem>)}
        </ToggleGroup>
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
        {filteredProjects.length > 0
          ? (
              <div className="grid content-start grid-cols-1 gap-3.5 md:grid-cols-2">
                {filteredProjects.map(p => (
                  <div
                    key={p.title}
                    ref={(node) => {
                      if (node)
                        projectRefs.current.set(p.title, node)
                      else
                        projectRefs.current.delete(p.title)
                    }}
                    className={`rounded-[6px] border bg-white/45 p-4 flex flex-col justify-between transition-colors hover:bg-white/70 dark:bg-white/[0.035] dark:hover:bg-white/[0.06] ${selectedProjectTitle === p.title ? 'ring-2 ring-ph-orange/40' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-sm text-ph-ink">{p.title}</h3>
                          {p.stars !== undefined && (
                            <span className="font-mono text-[10px] text-ph-muted">
                              ★
                              {p.stars}
                            </span>
                          )}
                        </div>
                        <span className={`shrink-0 rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] font-medium ${statusStyles[p.status]}`}>
                          {t(p.status)}
                        </span>
                      </div>
                      <p className="text-xs text-ph-muted leading-relaxed mb-3">{p.description}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[...new Set([...p.tags, ...p.tech])].map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.06] text-ph-muted rounded-[4px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t pt-2.5 text-[11px]">
                        <a
                          href={p.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 font-medium text-ph-muted hover:text-ph-orange"
                        >
                          <span>{t('sourceCode')}</span>
                          <ArrowSquareOutIcon size={12} />
                        </a>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 font-medium text-ph-orange hover:underline"
                        >
                          <span>{t('visitProject')}</span>
                          <ArrowSquareOutIcon size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          : <p className="py-10 text-center text-sm text-ph-muted">{t('empty')}</p>}
      </div>
    </ShellWindow>
  )
}
