'use client'

import {
  ArrowUpRightIcon,
  BookmarkSimpleIcon,
  GlobeHemisphereWestIcon,
  MagnifyingGlassIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { parseBookmarks } from '@/components/apps/bookmarks/manifest'
import type { BookmarkCategory, BookmarkSite } from '@/components/apps/bookmarks/manifest'
import { ShellWindow } from '@/components/shell/window'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useShellStore } from '@/stores/shell-store'

const categories: BookmarkCategory[] = ['search', 'video', 'reference', 'development']

export function BookmarksApp() {
  const isOpen = useShellStore(state => state.windows.bookmarks.open && !state.windows.bookmarks.minimized)

  if (!isOpen)
    return null

  return <BookmarksAppContent />
}

function BookmarksAppContent() {
  const t = useTranslations('apps.bookmarks')
  const [bookmarks, setBookmarks] = useState<BookmarkSite[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadBookmarks() {
      try {
        const response = await fetch('/data/bookmarks.json', { signal: controller.signal, cache: 'no-store' })
        if (!response.ok)
          throw new Error('Bookmark list unavailable')

        const data: unknown = await response.json()
        const result = parseBookmarks(data)
        if (!result)
          throw new Error('Invalid bookmark list')

        setBookmarks(result)
        setStatus('ready')
      }
      catch {
        if (!controller.signal.aborted)
          setStatus('error')
      }
    }

    void loadBookmarks()
    return () => controller.abort()
  }, [])

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredBookmarks = normalizedQuery
    ? bookmarks.filter(({ name, url }) => `${name} ${url} ${new URL(url).hostname}`.toLocaleLowerCase().includes(normalizedQuery))
    : bookmarks
  const groupedBookmarks = categories
    .map(category => ({
      category,
      sites: filteredBookmarks.filter(site => site.category === category),
    }))
    .filter(group => group.sites.length > 0)

  return (
    <ShellWindow
      id="bookmarks"
      title={t('title')}
      icon={<BookmarkSimpleIcon className="text-ph-blue" size={14} />}
      defaultWidth="min(1040px, 96vw)"
      defaultHeight="min(720px, 88vh)"
      defaultLeft={82}
      defaultTop={46}
    >
      <div className="flex min-h-0 flex-1 flex-col bg-ph-surface-body text-ph-ink">
        <div className="flex shrink-0 flex-col gap-4 border-b bg-ph-header/75 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-ph-blue/15 bg-ph-blue/10 text-ph-blue">
              <BookmarkSimpleIcon size={22} weight="duotone" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ph-muted">{t('eyebrow')}</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{t('heading')}</h1>
              <p className="mt-1 text-xs leading-relaxed text-ph-muted">{t('description')}</p>
            </div>
          </div>
          <InputGroup className="h-9 w-full rounded-lg bg-ph-surface/80 sm:max-w-[260px]">
            <InputGroupAddon>
              <MagnifyingGlassIcon className="text-ph-muted" />
            </InputGroupAddon>
            <InputGroupInput
              aria-label={t('search')}
              onChange={event => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              value={query}
            />
          </InputGroup>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <main className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
            {status === 'loading'
              ? <p className="py-12 text-center text-sm text-ph-muted" role="status">{t('loading')}</p>
              : status === 'error'
                ? (
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive" role="alert">
                      <WarningCircleIcon size={18} />
                      <span>{t('loadError')}</span>
                    </div>
                  )
                : groupedBookmarks.length > 0
                  ? (
                      <div className="space-y-8">
                        {groupedBookmarks.map(({ category, sites }) => (
                          <section key={category}>
                            <div className="mb-3 flex items-center justify-between border-b border-border/70 pb-2">
                              <h2 className="text-xs font-semibold tracking-wide text-ph-ink">{t(`categories.${category}`)}</h2>
                              <span className="font-mono text-[10px] text-ph-muted">{sites.length.toString().padStart(2, '0')}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {sites.map((site) => {
                                const hostname = new URL(site.url).hostname
                                return (
                                  <a
                                    key={site.id}
                                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-ph-surface/60 p-3 transition-colors hover:border-ph-blue/35 hover:bg-ph-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ph-blue"
                                    href={site.url}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ph-blue/10 text-ph-blue transition-colors group-hover:bg-ph-blue/15">
                                      <GlobeHemisphereWestIcon size={20} weight="duotone" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-sm font-medium text-ph-ink">{site.name}</span>
                                      <span className="mt-0.5 block truncate font-mono text-[10px] text-ph-muted">{hostname}</span>
                                    </span>
                                    <ArrowUpRightIcon className="shrink-0 text-ph-muted transition-colors group-hover:text-ph-blue" size={16} />
                                  </a>
                                )
                              })}
                            </div>
                          </section>
                        ))}
                      </div>
                    )
                  : <p className="py-16 text-center text-sm text-ph-muted">{query ? t('noResults') : t('empty')}</p>}
          </main>
        </ScrollArea>
      </div>
    </ShellWindow>
  )
}
