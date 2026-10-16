'use client'

import {
  FileTextIcon,
  LightbulbIcon,
  SparkleIcon,
  StarIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { careerChangelog, profileData, techStackCategories } from '@/lib/shell-content'
import { ShellWindow } from '@/components/shell/window'
import { useShellStore } from '@/stores/shell-store'

export function ReadmeApp() {
  const t = useTranslations('apps.readme')
  const tCommon = useTranslations('common')
  const openWindow = useShellStore(state => state.openWindow)
  const showToast = useShellStore(state => state.showToast)

  function copyEmail() {
    navigator.clipboard.writeText(profileData.email)
    showToast(`${tCommon('copied')}: ${profileData.email}`)
  }

  return (
    <ShellWindow
      id="readme"
      title={t('title')}
      badge={t('badge')}
      defaultWidth="min(680px, 92vw)"
      defaultHeight="min(520px, 75vh)"
      defaultLeft={48}
      defaultTop={24}
      icon={<FileTextIcon size={14} weight="regular" className="text-ph-muted" />}
      headerRight={(
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-[5px] border bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-ph-ink transition-all cursor-pointer"
        >
          {t('contactMe')}
        </button>
      )}
    >
      <div className="flex-1 flex overflow-hidden">
        {/* Left Finder-Style Sidebar */}
        <aside className="hidden md:flex flex-col justify-between w-44 bg-ph-sidebar border-r p-3 shrink-0 select-none">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-ph-muted mb-1.5 px-2">{t('outline')}</div>
              <nav className="space-y-0.5 text-xs">
                <a
                  href="#sec-intro"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] bg-black/[0.06] dark:bg-white/[0.08] text-ph-ink font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ph-orange" />
                  <span>{t('aboutMe')}</span>
                </a>
                <a
                  href="#sec-stack"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span>{t('techStack')}</span>
                </a>
                <a
                  href="#sec-exp"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span>{t('milestones')}</span>
                </a>
              </nav>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-ph-muted mb-1.5 px-2">WORKSPACE</div>
              <div className="space-y-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => openWindow('projects')}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                >
                  <span>Projects.app</span>
                </button>
                <button
                  type="button"
                  onClick={() => openWindow('gallery')}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-orange font-medium hover:bg-ph-orange/10 transition-colors text-left cursor-pointer"
                >
                  <span>Albums</span>
                </button>
                <button
                  type="button"
                  onClick={() => openWindow('settings')}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                >
                  <span>Settings.app</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#DAD7C8]/70 dark:bg-[#1E222E] border text-[11px]">
            <div className="font-mono font-semibold text-ph-ink mb-0.5 flex items-center gap-1.5 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-ph-green" />
              <span>WARM STONE UI</span>
            </div>
            <p className="text-ph-muted leading-relaxed text-[11px]">
              无刺眼纯白块，采用暖石托盘与羊皮纸层级。
            </p>
          </div>
        </aside>

        {/* Right Main Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Hero Profile Header */}
          <div id="sec-intro" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[8px] border bg-white/50 dark:bg-white/5 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] flex items-center justify-center text-ph-orange shrink-0">
                <SparkleIcon size={24} weight="regular" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-mono text-[10px] font-semibold mb-1">
                  <span>{profileData.title}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ph-ink">
                  {profileData.name}
                </h1>
                <p className="text-xs text-ph-muted mt-0.5">
                  {profileData.bio}
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                type="button"
                onClick={() => openWindow('projects')}
                size="sm"
              >
                {t('viewProjects')}
              </Button>
              <Button
                type="button"
                onClick={() => openWindow('gallery')}
                variant="outline"
                size="sm"
              >
                {t('viewGallery')}
              </Button>
            </div>
          </div>

          {/* Bento Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5 sm:col-span-2 flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-ph-orange/10 text-ph-orange flex items-center justify-center shrink-0 mt-0.5">
                <LightbulbIcon size={14} weight="regular" />
              </div>
              <div className="text-xs leading-relaxed text-ph-ink">
                <strong className="font-semibold">{t('philosophyTitle')}</strong>
                {profileData.philosophy}
              </div>
            </div>
            <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-ph-muted">{t('starsLabel')}</span>
              <div className="text-2xl font-bold text-ph-ink my-0.5 flex items-center gap-1.5">
                <StarIcon size={18} weight="fill" className="text-ph-orange" />
                <span>{profileData.stars}</span>
              </div>
              <span className="text-[10px] text-ph-muted font-mono">{profileData.kitsCount}</span>
            </div>
          </div>

          {/* Tech Stack Matrix */}
          <div id="sec-stack">
            <h2 className="font-mono text-[11px] uppercase tracking-wider font-semibold text-ph-muted mb-2.5">
              {t('techTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {techStackCategories.map(cat => (
                <div key={cat.title} className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5">
                  <div className="font-mono text-[11px] font-semibold text-ph-ink mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-ph-muted">
                    {cat.items.map(item => (
                      <span key={item} className="px-2 py-0.5 bg-black/[0.04] dark:bg-white/[0.06] rounded-[4px] text-ph-ink">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Changelog */}
          <div id="sec-exp">
            <h2 className="font-mono text-[11px] uppercase tracking-wider font-semibold text-ph-muted mb-2.5">
              {t('careerTitle')}
            </h2>
            <div className="space-y-2 text-xs">
              {careerChangelog.map((c, idx) => (
                <div key={c.version} className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] flex flex-col sm:flex-row sm:items-center justify-between p-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded-[4px] font-mono font-semibold text-[10px] ${
                        idx === 0
                          ? 'bg-ph-orange/10 text-ph-orange'
                          : 'bg-black/[0.05] dark:bg-white/[0.08] text-ph-muted'
                      }`}
                      >
                        {c.version}
                      </span>
                      <strong className="font-semibold text-ph-ink text-xs">{c.role}</strong>
                    </div>
                    <p className="text-ph-muted mt-1">{c.desc}</p>
                  </div>
                  <span className="font-mono text-[11px] text-ph-muted shrink-0 mt-1.5 sm:mt-0">{c.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShellWindow>
  )
}
