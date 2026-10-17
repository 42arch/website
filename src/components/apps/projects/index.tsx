'use client'

import { ArrowRightIcon, FolderSimpleIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useProjectsStore } from '@/components/apps/projects/store'
import { ShellWindow } from '@/components/shell/window'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { projectsData } from '@/lib/shell-content'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useShellStore } from '@/stores/shell-store'

const projectFilters = ['all', 'ai', 'oss', 'saas'] as const

export function ProjectsApp() {
  const t = useTranslations('apps.projects')
  const filter = useProjectsStore(state => state.filter)
  const selectedProjectTitle = useProjectsStore(state => state.selectedProjectTitle)
  const setFilter = useProjectsStore(state => state.setFilter)
  const showToast = useShellStore(state => state.showToast)
  const projectsWindowOpen = useShellStore(state => state.windows.projects.open && !state.windows.projects.minimized)
  const projectRefs = useRef(new Map<string, HTMLDivElement>())

  const filteredProjects = projectsData.filter(project => filter === 'all' || project.category === filter)

  useEffect(() => {
    if (selectedProjectTitle)
      projectRefs.current.get(selectedProjectTitle)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [projectsWindowOpen, selectedProjectTitle])

  function inspectProject(title: string) {
    showToast(`${t('viewDetail')}: ${title}`)
    captureTelemetryEvent('project_inspected', { project: title })
  }

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
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <h3 className="font-bold text-sm text-ph-ink">{p.title}</h3>
                        </div>
                        <span className="px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] font-mono text-[10px] font-medium text-ph-muted">
                          ★
                          {' '}
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-ph-muted leading-relaxed mb-3">{p.desc}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.stack.map(s => (
                          <span key={s} className="px-1.5 py-0.5 text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.06] text-ph-muted rounded-[4px]">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2.5 border-t flex items-center justify-between text-[11px] font-mono">
                        <span className="text-ph-muted">{p.metric}</span>
                        <button
                          type="button"
                          onClick={() => inspectProject(p.title)}
                          className="text-ph-orange font-medium hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{t('viewDetail')}</span>
                          <ArrowRightIcon size={12} weight="bold" />
                        </button>
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
