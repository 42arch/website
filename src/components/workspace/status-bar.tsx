/* eslint-disable e18e/prefer-static-regex */
'use client'

import { CheckCircleIcon, CodeIcon, GitBranchIcon } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { site } from '@/config'
import { useIsMobile } from '@/lib/use-mobile'
import { PANEL_CONFIG } from '@/store/workspace'
import pkg from '../../../package.json'

const brandSlug = site.name.toLowerCase().replace(/\s+/g, '-')

export function StatusBar() {
  const pathname = usePathname()
  const activePanel = pathname.split('/')[1] || 'overview'
  const config = PANEL_CONFIG[activePanel as keyof typeof PANEL_CONFIG] || PANEL_CONFIG.overview
  const isMobile = useIsMobile()
  const version = pkg.version

  const repoUrl = site.githubRepo || (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url) || ''
  const getRepoPath = (url: string) => {
    if (!url)
      return ''
    const cleanUrl = url.replace(/^git\+/, '').replace(/\.git$/, '')
    try {
      const parsed = new URL(cleanUrl)
      return parsed.pathname.replace(/^\//, '')
    }
    catch {
      const match = cleanUrl.match(/github\.com\/([^/]+\/[^/]+)/)
      return match ? match[1] : ''
    }
  }
  const repoPath = getRepoPath(repoUrl)

  const [gitInfo, setGitInfo] = useState<{ branch: string, issues: number }>({
    branch: 'main',
    issues: 0,
  })

  useEffect(() => {
    if (!repoPath)
      return

    fetch(`https://api.github.com/repos/${repoPath}`)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.message) {
          setGitInfo({
            branch: data.default_branch || 'main',
            issues: data.open_issues_count || 0,
          })
        }
      })
      .catch(err => console.error('Error fetching git info:', err))
  }, [repoPath])

  if (isMobile) {
    return (
      <footer
        id="status-bar"
        className="flex h-6 shrink-0 items-center justify-between border-t border-os-border bg-os-toolbar px-3 font-mono text-[10px] text-muted-foreground"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <span className="flex items-center gap-1">
          <div className="size-1.5 rounded-full bg-os-indicator animate-pulse" />
          {config.label}
        </span>
        <span>
          {brandSlug}
          {' '}
          v
          {version}
        </span>
      </footer>
    )
  }

  return (
    <footer
      id="status-bar"
      className="flex h-6 shrink-0 items-center justify-between border-t border-os-border bg-os-toolbar px-3 font-mono text-[10px] text-muted-foreground"
    >
      <div className="flex items-center gap-3">
        {repoUrl
          ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <GitBranchIcon size={11} />
                {gitInfo.branch}
              </a>
            )
          : (
              <span className="flex items-center gap-1">
                <GitBranchIcon size={11} />
                {gitInfo.branch}
              </span>
            )}
        <a
          href={repoUrl ? `${repoUrl}/issues` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <CheckCircleIcon size={11} className={gitInfo.issues > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'} />
          {gitInfo.issues}
          {' '}
          {gitInfo.issues === 1 ? 'issue' : 'issues'}
        </a>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <CodeIcon size={11} />
          {config.label}
        </span>
        <span>UTF-8</span>
        <span>
          {brandSlug}
          {' '}
          v
          {version}
        </span>
      </div>
    </footer>
  )
}
