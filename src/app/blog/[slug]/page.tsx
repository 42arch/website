import type { ReactNode } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidElement } from 'react'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { resolveLocale } from '@/i18n/config'
import { formatDate } from '@/lib/date-utils'
import {
  getBlogPostPage,
  getBlogPosts,
  getBlogStaticSlugs,
  normalizeBlogDateInput,
  normalizeBlogSlug,
} from '@/lib/blog-source'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function getTocTitle(title: ReactNode): string {
  if (title === null || title === undefined || typeof title === 'boolean')
    return ''

  if (typeof title === 'string' || typeof title === 'number')
    return String(title)

  if (Array.isArray(title))
    return title.map(getTocTitle).join('').trim()

  if (isValidElement<{ children?: ReactNode }>(title))
    return getTocTitle(title.props.children)

  return ''
}

export function generateStaticParams() {
  return getBlogStaticSlugs().map(slug => ({ slug }))
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const locale = resolveLocale(await getLocale())
  const t = await getTranslations('BlogDetail')
  const page = getBlogPostPage(slug, locale)
  const posts = await getBlogPosts(locale)

  if (!page)
    notFound()

  const Content = page.data.body
  const tocItems = page.data.toc.filter(item => item.url.startsWith('#') && item.depth <= 3)
  const currentSlug = normalizeBlogSlug(slug)
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)
  const currentPost = currentIndex >= 0 ? posts[currentIndex] : null
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const normalizedDate = normalizeBlogDateInput(page.data.date)

  return (
    <div id="article-top" className="relative pt-8 pb-14">
      <div className="fixed right-3 bottom-6 z-30 flex flex-col gap-2 md:right-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <ScrollToTopButton label={t('top')} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="cyan" size="sm">{t('toc')}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start" className="max-h-72 w-56 overflow-y-auto">
            <DropdownMenuLabel>{t('toc')}</DropdownMenuLabel>
            {tocItems.length === 0 && (
              <DropdownMenuItem disabled>
                {t('noToc')}
              </DropdownMenuItem>
            )}
            {tocItems.map((item, index) => {
              const title = getTocTitle(item.title)

              return (
                <DropdownMenuItem
                  asChild
                  key={`${item.url}-${index}`}
                  style={{ paddingInlineStart: `${Math.max(item.depth - 2, 0) * 12 + 8}px` }}
                >
                  <Link href={item.url}>
                    {title || t('section', { index: index + 1 })}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="pixel-fade-in mx-auto w-full max-w-3xl bg-[var(--pixel-panel)]">
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-wrap gap-2">
            {page.data.tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="text-base leading-8 text-[var(--pixel-yellow)] md:text-lg">{page.data.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-[9px] text-[var(--muted-foreground)]">
            <span>{formatDate(normalizedDate, locale, 'PPP')}</span>
            <span className="text-[var(--pixel-cyan)]">{currentPost?.readTime ?? '--'}</span>
          </div>

          <Separator className="bg-[var(--pixel-border)]" />

          <div className="blog-content">
            <Content />
          </div>

          <Separator className="bg-[var(--pixel-border)]" />

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[9px] text-[var(--muted-foreground)]">{t('previous')}</p>
              {previousPost && (
                <Button asChild variant="ghost" className="h-auto w-full justify-start py-2 text-left normal-case">
                  <Link href={previousPost.url}>{previousPost.title}</Link>
                </Button>
              )}
              {!previousPost && (
                <p className="text-[9px] text-[var(--muted-foreground)]">{t('none')}</p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[9px] text-[var(--muted-foreground)]">{t('next')}</p>
              {nextPost && (
                <Button asChild variant="ghost" className="h-auto w-full justify-start py-2 text-left normal-case">
                  <Link href={nextPost.url}>{nextPost.title}</Link>
                </Button>
              )}
              {!nextPost && (
                <p className="text-[9px] text-[var(--muted-foreground)]">{t('none')}</p>
              )}
            </div>
          </div>

          <Separator className="bg-[var(--pixel-border)]" />

          <Button asChild variant="green">
            <Link href="/blog">{t('back')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
