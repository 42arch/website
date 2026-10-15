'use client'

import { ArrowRightIcon, FolderSimpleIcon, StarIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { ShellWindow } from '@/components/shell/window'
import { projectsData } from '@/lib/shell-content'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useProjectsStore } from '@/stores/apps/projects-store'
import { useShellStore } from '@/stores/shell-store'

export function ProjectsApp() {
  const t = useTranslations('apps.projects')
  const filter = useProjectsStore(state => state.filter)
  const setFilter = useProjectsStore(state => state.setFilter)
  const showToast = useShellStore(state => state.showToast)

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter)

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
        <div className="flex items-center p-0.5 rounded-[4px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs select-none">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            {t('all')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('ai')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              filter === 'ai'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            {t('ai')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('oss')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              filter === 'oss'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            {t('oss')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('saas')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              filter === 'saas'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            {t('saas')}
          </button>
        </div>
      )}
      headerRight={(
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-ph-muted">
          <StarIcon size={12} weight="fill" className="text-ph-orange" />
          <span>14.2k Stars</span>
        </div>
      )}
    >
      <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredProjects.map(p => (
          <div key={p.title} className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] hover:bg-white/70 dark:hover:bg-white/[0.06] p-4 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="font-bold text-sm text-ph-ink">{p.title}</h3>
                </div>
                <span className="px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] font-mono text-[10px] font-medium text-ph-muted">
                  ★ {p.badge}
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
              <div className="pt-2.5 border-t border-ph-border-subtle flex items-center justify-between text-[11px] font-mono">
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
    </ShellWindow>
  )
}
