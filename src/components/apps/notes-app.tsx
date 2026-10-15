'use client'

import type { ReactNode } from 'react'
import type { NoteMeta } from '@/lib/notes-data'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  ArticleIcon,
  CopyIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  TagIcon,
  XIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { noteCategories, staticNotesList } from '@/lib/notes-data'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useNotesStore } from '@/stores/apps/notes-store'
import { useShellStore } from '@/stores/shell-store'

interface NotesAppProps {
  currentSlug?: string | null
  notesList?: NoteMeta[]
  renderedContent?: ReactNode
  currentNote?: NoteMeta | null
}

export function NotesApp({
  currentSlug,
  notesList = staticNotesList,
  renderedContent,
  currentNote: serverCurrentNote,
}: NotesAppProps) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('apps.notes')
  const showToast = useShellStore(state => state.showToast)

  const searchQuery = useNotesStore(state => state.searchQuery)
  const selectedCategory = useNotesStore(state => state.selectedCategory)
  const setSearchQuery = useNotesStore(state => state.setSearchQuery)
  const setSelectedCategory = useNotesStore(state => state.setSelectedCategory)
  const setSelectedSlug = useNotesStore(state => state.setSelectedSlug)

  // Derive active slug from currentSlug prop or pathname /notes/[slug]
  const pathSlug = pathname?.startsWith('/notes/')
    ? pathname.replace(/^\/notes\/?/, '').split('/')[0]
    : null
  const activeSlug = currentSlug || pathSlug || null
  const isDetail = Boolean(activeSlug)

  // Active note in detail view
  const activeNote = useMemo(() => {
    if (!activeSlug)
      return null
    if (serverCurrentNote && serverCurrentNote.slug === activeSlug)
      return serverCurrentNote
    return notesList.find(n => n.slug === activeSlug) || null
  }, [activeSlug, notesList, serverCurrentNote])

  // Filtered notes for list view
  const filteredNotes = useMemo(() => {
    return notesList.filter((note) => {
      const matchesCategory
        = selectedCategory === 'all' || selectedCategory === '全部'
        || note.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch
        = !query
        || note.title.toLowerCase().includes(query)
        || note.intro.toLowerCase().includes(query)
        || note.tags.some(tag => tag.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [notesList, selectedCategory, searchQuery])

  // Adjacent notes for detail view pagination
  const { prevNote, nextNote } = useMemo(() => {
    if (!activeSlug)
      return { prevNote: null, nextNote: null }
    const currentIndex = notesList.findIndex(n => n.slug === activeSlug)
    return {
      prevNote: currentIndex > 0 ? notesList[currentIndex - 1] : null,
      nextNote: currentIndex >= 0 && currentIndex < notesList.length - 1 ? notesList[currentIndex + 1] : null,
    }
  }, [activeSlug, notesList])

  function handleOpenNote(slug: string) {
    setSelectedSlug(slug)
    captureTelemetryEvent('note_opened', { slug })
    router.push(`/notes/${slug}`)
  }

  function handleBackToList() {
    setSelectedSlug(null)
    captureTelemetryEvent('note_back_to_list', { from: activeSlug })
    router.push('/notes')
  }

  function handleCopyLink() {
    if (!activeNote)
      return
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/notes/${activeNote.slug}`
      : `/notes/${activeNote.slug}`
    navigator.clipboard.writeText(url)
    showToast(t('copiedLink'))
    captureTelemetryEvent('note_link_copied', { slug: activeNote.slug })
  }

  return (
    <ShellWindow
      id="notes"
      title={isDetail && activeNote ? `${activeNote.title} — Notes.app` : t('title')}
      badge={isDetail ? activeNote?.category : `${notesList.length} Notes`}
      defaultWidth="min(760px, 94vw)"
      defaultHeight="min(600px, 80vh)"
      defaultLeft={150}
      defaultTop={48}
      icon={<ArticleIcon size={14} weight="regular" className="text-ph-orange" />}
      headerCenter={!isDetail ? (
        <div className="hidden sm:flex items-center p-0.5 rounded-[4px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs select-none">
          {noteCategories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat === '全部' ? 'all' : cat)}
              className={`px-2.5 py-0.5 rounded-[4px] font-medium transition-colors cursor-pointer ${
                (cat === '全部' && (selectedCategory === 'all' || selectedCategory === '全部'))
                || selectedCategory === cat
                  ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                  : 'text-ph-muted hover:text-ph-ink'
              }`}
            >
              {cat === '全部' ? t('all') : cat}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleBackToList}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-xs font-mono font-medium hover:bg-black/5 dark:hover:bg-white/10 text-ph-ink transition-colors cursor-pointer"
        >
          <ArrowLeftIcon size={12} weight="bold" className="text-ph-orange" />
          <span>{t('backToList')}</span>
        </button>
      )}
      headerRight={isDetail && activeNote ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            title={t('copyLink')}
            className="flex items-center gap-1 px-2 py-0.5 rounded-[4px] border border-ph-border bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 text-[11px] font-mono text-ph-ink transition-colors cursor-pointer"
          >
            <CopyIcon size={12} weight="bold" />
            <span className="hidden sm:inline">{t('copyLink')}</span>
          </button>
        </div>
      ) : (
        <div className="text-[11px] font-mono text-ph-muted">
          {t('articlesCount', { count: filteredNotes.length })}
        </div>
      )}
    >
      {isDetail && activeNote ? (
        /* ================= 文章详情页面 (DETAIL VIEW) ================= */
        <article className="flex-1 flex flex-col overflow-y-auto p-5 sm:p-7 bg-ph-surface">
          <div className="max-w-3xl w-full mx-auto space-y-5">
            {/* Top Return Link */}
            <div className="flex items-center justify-between border-b border-ph-border-subtle pb-3">
              <button
                type="button"
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] text-xs font-mono border border-ph-border-subtle bg-black/[0.03] dark:bg-white/[0.06] hover:bg-ph-orange hover:text-white transition-colors cursor-pointer text-ph-ink"
              >
                <ArrowLeftIcon size={12} weight="bold" />
                <span>{t('backToList')}</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/notes/${activeNote.slug}`}
                  className="flex items-center gap-1 text-[11px] font-mono text-ph-orange hover:underline"
                >
                  <span>/notes/{activeNote.slug}</span>
                  <ArrowSquareOutIcon size={12} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Article Hero */}
            <header className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-mono text-[11px] font-semibold">
                  {activeNote.category}
                </span>
                <span className="text-xs font-mono text-ph-muted">
                  {activeNote.date}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ph-ink leading-tight">
                {activeNote.title}
              </h1>

              <p className="text-xs sm:text-sm text-ph-muted leading-relaxed">
                {activeNote.intro}
              </p>

              {activeNote.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <TagIcon size={12} className="text-ph-muted mr-0.5" />
                  {activeNote.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] font-mono text-[10px] text-ph-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="border-t border-ph-border-subtle" />

            {/* Rendered MDX Content */}
            <div className="notes-prose text-xs sm:text-sm text-ph-ink/90 leading-relaxed space-y-4 select-text">
              {renderedContent || (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    {activeNote.intro}
                  </p>
                  <div className="p-4 rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] space-y-2">
                    <div className="font-mono text-xs font-semibold text-ph-orange">
                      Fumadocs Route
                    </div>
                    <p className="text-xs text-ph-muted leading-relaxed">
                      正在载入 <code>content/notes/{activeNote.slug}.mdx</code> 详细内容...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation (Prev / Next) */}
            <div className="pt-6 mt-6 border-t border-ph-border-subtle flex items-center justify-between gap-3 text-xs font-mono">
              <div>
                {prevNote ? (
                  <button
                    type="button"
                    onClick={() => handleOpenNote(prevNote.slug)}
                    className="flex items-center gap-1.5 text-ph-muted hover:text-ph-orange transition-colors cursor-pointer text-left"
                  >
                    <ArrowLeftIcon size={12} weight="bold" />
                    <span>{t('prevArticle')}: {prevNote.title}</span>
                  </button>
                ) : <span />}
              </div>

              <div>
                {nextNote ? (
                  <button
                    type="button"
                    onClick={() => handleOpenNote(nextNote.slug)}
                    className="flex items-center gap-1.5 text-ph-muted hover:text-ph-orange transition-colors cursor-pointer text-right"
                  >
                    <span>{t('nextArticle')}: {nextNote.title}</span>
                    <ArrowRightIcon size={12} weight="bold" />
                  </button>
                ) : <span />}
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* ================= 文章列表页面 (LIST VIEW) ================= */
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-ph-surface flex flex-col">
          {/* Top Search & Filter Bar */}
          <div className="space-y-3 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <MagnifyingGlassIcon
                  size={14}
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ph-muted pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-9 pr-8 py-2 rounded-[6px] bg-black/[0.03] dark:bg-white/[0.05] border border-ph-border-subtle text-xs text-ph-ink placeholder:text-ph-muted/70 focus:outline-none focus:border-ph-orange/50 transition-colors font-mono"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-ph-muted hover:text-ph-ink cursor-pointer"
                  >
                    <XIcon size={12} weight="bold" />
                  </button>
                )}
              </div>

              {/* Mobile Category Chips */}
              <div className="sm:hidden flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                <span className="text-ph-muted shrink-0 mr-1">
                  <FunnelIcon size={12} weight="bold" />
                </span>
                {noteCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat === '全部' ? 'all' : cat)}
                    className={`px-2 py-0.5 rounded-[4px] text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                      (cat === '全部' && (selectedCategory === 'all' || selectedCategory === '全部'))
                      || selectedCategory === cat
                        ? 'bg-ph-orange text-white'
                        : 'text-ph-muted bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    {cat === '全部' ? t('all') : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles List Cards */}
          <div className="flex-1 space-y-3">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div
                  key={note.slug}
                  onClick={() => handleOpenNote(note.slug)}
                  className="rounded-[8px] border border-ph-border-subtle bg-white/50 dark:bg-white/[0.035] hover:bg-white/80 dark:hover:bg-white/[0.07] hover:border-ph-orange/50 p-4 sm:p-5 transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="px-2 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-semibold">
                      {note.category}
                    </span>
                    <span className="text-ph-muted">{note.date}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-ph-ink group-hover:text-ph-orange transition-colors flex items-center justify-between">
                    <span>{note.title}</span>
                    <ArrowRightIcon
                      size={14}
                      weight="bold"
                      className="text-ph-muted group-hover:text-ph-orange group-hover:translate-x-1 transition-all shrink-0 ml-2"
                    />
                  </h3>

                  <p className="text-xs sm:text-[13px] text-ph-muted leading-relaxed mt-2 line-clamp-2">
                    {note.intro}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-ph-border-subtle text-[11px] font-mono">
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] text-ph-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-ph-orange font-medium flex items-center gap-1 group-hover:underline">
                      <span>{t('readArticle')}</span>
                      <ArrowRightIcon size={11} weight="bold" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-xs text-ph-muted">
                <ArticleIcon size={32} className="opacity-30 mb-2" />
                <p>{t('empty')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </ShellWindow>
  )
}
