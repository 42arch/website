'use client'

import type { ReactNode } from 'react'
import type { BlogMeta } from '@/lib/blog-data'
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
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { blogCategories, staticBlogList } from '@/lib/blog-data'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useBlogStore } from '@/stores/apps/blog-store'
import { useShellStore } from '@/stores/shell-store'

interface BlogAppProps {
  currentSlug?: string | null
  blogList?: BlogMeta[]
  renderedContent?: ReactNode
  currentArticle?: BlogMeta | null
}

export function BlogApp({
  currentSlug,
  blogList = staticBlogList,
  renderedContent,
  currentArticle: serverCurrentArticle,
}: BlogAppProps) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('apps.blog')
  const showToast = useShellStore(state => state.showToast)

  const searchQuery = useBlogStore(state => state.searchQuery)
  const selectedCategory = useBlogStore(state => state.selectedCategory)
  const setSearchQuery = useBlogStore(state => state.setSearchQuery)
  const setSelectedCategory = useBlogStore(state => state.setSelectedCategory)
  const setSelectedSlug = useBlogStore(state => state.setSelectedSlug)

  // Derive active slug from currentSlug prop or pathname /blog/[slug]
  const pathSlug = pathname?.startsWith('/blog/')
    ? pathname.replace(/^\/blog\/?/, '').split('/')[0]
    : null
  const activeSlug = currentSlug || pathSlug || null
  const isDetail = Boolean(activeSlug)

  // Active note in detail view
  const activeArticle = useMemo(() => {
    if (!activeSlug)
      return null
    if (serverCurrentArticle && serverCurrentArticle.slug === activeSlug)
      return serverCurrentArticle
    return blogList.find(n => n.slug === activeSlug) || null
  }, [activeSlug, blogList, serverCurrentArticle])

  // Filtered notes for list view
  const filteredArticles = useMemo(() => {
    return blogList.filter((note) => {
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
  }, [blogList, selectedCategory, searchQuery])

  // Adjacent notes for detail view pagination
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!activeSlug)
      return { prevArticle: null, nextArticle: null }
    const currentIndex = blogList.findIndex(n => n.slug === activeSlug)
    return {
      prevArticle: currentIndex > 0 ? blogList[currentIndex - 1] : null,
      nextArticle: currentIndex >= 0 && currentIndex < blogList.length - 1 ? blogList[currentIndex + 1] : null,
    }
  }, [activeSlug, blogList])

  function handleOpenArticle(slug: string) {
    setSelectedSlug(slug)
    captureTelemetryEvent('blog_article_opened', { slug })
    router.push(`/blog/${slug}`)
  }

  function handleBackToArticles() {
    setSelectedSlug(null)
    if (activeSlug)
      captureTelemetryEvent('blog_back_to_list', { from: activeSlug })
    router.push('/blog')
  }

  function handleCopyArticleLink() {
    if (!activeArticle)
      return
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${activeArticle.slug}`
      : `/blog/${activeArticle.slug}`
    navigator.clipboard.writeText(url)
    showToast(t('copiedLink'))
    captureTelemetryEvent('blog_link_copied', { slug: activeArticle.slug })
  }

  return (
    <ShellWindow
      id="blog"
      title={isDetail && activeArticle ? `${activeArticle.title} — Blog.app` : t('title')}
      badge={isDetail ? activeArticle?.category : t('articlesCount', { count: blogList.length })}
      defaultWidth="min(760px, 94vw)"
      defaultHeight="min(600px, 80vh)"
      defaultLeft={150}
      defaultTop={48}
      icon={<ArticleIcon size={14} weight="regular" className="text-ph-orange" />}
      headerCenter={<span className="font-mono text-xs font-semibold">Blog.app</span>}
      headerRight={isDetail && activeArticle ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyArticleLink}
            title={t('copyLink')}
            className="flex items-center gap-1 px-2 py-0.5 rounded-[4px] border bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 text-[11px] font-mono text-ph-ink transition-colors cursor-pointer"
          >
            <CopyIcon size={12} weight="bold" />
            <span className="hidden sm:inline">{t('copyLink')}</span>
          </button>
        </div>
      ) : (
        <div className="text-[11px] font-mono text-ph-muted">
          {t('articlesCount', { count: filteredArticles.length })}
        </div>
      )}
    >
      {isDetail && activeArticle ? (
        /* ================= 文章详情页面 (DETAIL VIEW) ================= */
        <article className="flex-1 flex flex-col overflow-y-auto p-5 sm:p-7 bg-ph-surface">
          <div className="max-w-3xl w-full mx-auto space-y-5">
            {/* Top Return Link */}
            <div className="flex items-center justify-between border-b pb-3">
              <button
                type="button"
                onClick={handleBackToArticles}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] text-xs font-mono border bg-black/[0.03] dark:bg-white/[0.06] hover:bg-ph-orange hover:text-white transition-colors cursor-pointer text-ph-ink"
              >
                <ArrowLeftIcon size={12} weight="bold" />
                <span>{t('backToList')}</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${activeArticle.slug}`}
                  className="flex items-center gap-1 text-[11px] font-mono text-ph-orange hover:underline"
                >
                  <span>/blog/{activeArticle.slug}</span>
                  <ArrowSquareOutIcon size={12} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Article Hero */}
            <header className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-mono text-[11px] font-semibold">
                  {activeArticle.category}
                </span>
                {activeArticle.date && (
                  <span className="text-xs font-mono text-ph-muted">
                    {activeArticle.date}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ph-ink leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-xs sm:text-sm text-ph-muted leading-relaxed">
                {activeArticle.intro}
              </p>

              {activeArticle.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <TagIcon size={12} className="text-ph-muted mr-0.5" />
                  {activeArticle.tags.map(tag => (
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

            <div className="border-t" />

            {/* Rendered MDX Content */}
            <div className="blog-prose text-xs sm:text-sm text-ph-ink/90 leading-relaxed space-y-4 select-text">
              {renderedContent || (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    {activeArticle.intro}
                  </p>
                  <div className="p-4 rounded-[6px] border bg-white/45 dark:bg-white/[0.035] space-y-2">
                    <div className="font-mono text-xs font-semibold text-ph-orange">
                      Fumadocs Route
                    </div>
                    <p className="text-xs text-ph-muted leading-relaxed">
                      正在载入 <code>content/blog/{activeArticle.slug}.mdx</code> 详细内容...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation (Prev / Next) */}
            <div className="pt-6 mt-6 border-t flex items-center justify-between gap-3 text-xs font-mono">
              <div>
                {prevArticle ? (
                  <button
                    type="button"
                    onClick={() => handleOpenArticle(prevArticle.slug)}
                    className="flex items-center gap-1.5 text-ph-muted hover:text-ph-orange transition-colors cursor-pointer text-left"
                  >
                    <ArrowLeftIcon size={12} weight="bold" />
                    <span>{t('prevArticle')}: {prevArticle.title}</span>
                  </button>
                ) : <span />}
              </div>

              <div>
                {nextArticle ? (
                  <button
                    type="button"
                    onClick={() => handleOpenArticle(nextArticle.slug)}
                    className="flex items-center gap-1.5 text-ph-muted hover:text-ph-orange transition-colors cursor-pointer text-right"
                  >
                    <span>{t('nextArticle')}: {nextArticle.title}</span>
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
          {/* Search and category filters */}
          <div className="space-y-3 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <InputGroup className="flex-1">
                <InputGroupAddon>
                  <MagnifyingGlassIcon weight="bold" />
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  aria-label={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="font-mono"
                />
                {searchQuery && (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() => setSearchQuery('')}
                      aria-label={t('clearSearch')}
                    >
                      <XIcon weight="bold" />
                    </InputGroupButton>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>
            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 text-xs">
              <FunnelIcon className="shrink-0 text-ph-muted" size={13} weight="bold" />
              <ToggleGroup
                type="single"
                value={selectedCategory === '全部' ? 'all' : selectedCategory}
                onValueChange={(value) => {
                  if (value)
                    setSelectedCategory(value)
                }}
                variant="outline"
                size="sm"
                spacing={0}
                aria-label={t('title')}
              >
                {blogCategories.map(cat => (
                  <ToggleGroupItem key={cat} value={cat === '全部' ? 'all' : cat}>
                    {cat === '全部' ? t('all') : cat}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {/* Articles List Cards */}
          <div className="flex-1 space-y-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(note => (
                <div
                  key={note.slug}
                  onClick={() => handleOpenArticle(note.slug)}
                  className="rounded-[8px] border bg-white/50 dark:bg-white/[0.035] hover:bg-white/80 dark:hover:bg-white/[0.07] hover:border-ph-orange/50 p-4 sm:p-5 transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="px-2 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-semibold">
                      {note.category}
                    </span>
                    {note.date && <span className="text-ph-muted">{note.date}</span>}
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

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t text-[11px] font-mono">
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
