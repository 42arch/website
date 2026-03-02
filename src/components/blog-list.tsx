'use client'

import type { AppLocale } from '@/i18n/config'
import type { BlogPostListItem } from '@/lib/blog-source'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { formatDate } from '@/lib/date-utils'

interface BlogListProps {
  locale: AppLocale
  posts: BlogPostListItem[]
}

export function BlogList({ locale, posts }: BlogListProps) {
  const t = useTranslations('BlogList')
  const allTags = useMemo(() => Array.from(new Set(posts.flatMap(post => post.tags))), [posts])
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!activeTag)
      return posts

    return posts.filter(post => post.tags.includes(activeTag))
  }, [activeTag, posts])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[9px] text-[var(--muted-foreground)]">{t('filter')}</span>
        <Button
          type="button"
          size="sm"
          variant={activeTag === null ? 'green' : 'ghost'}
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
        >
          {t('all')}
        </Button>

        {allTags.map(tag => (
          <Button
            key={tag}
            type="button"
            size="sm"
            variant={activeTag === tag ? 'cyan' : 'ghost'}
            onClick={() => setActiveTag(current => (current === tag ? null : tag))}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={post.url}
            className="block"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Card className="pixel-fade-in bg-[var(--pixel-card)]">
              <CardHeader className="space-y-3 p-5 pb-3">
                <div className="flex flex-wrap items-center gap-2 text-[9px] text-[var(--muted-foreground)]">
                  <span className="text-[var(--pixel-yellow)]">
                    {t('category')}
                    {post.category}
                  </span>
                  <span>{formatDate(post.date, locale)}</span>
                  <span className="text-[var(--pixel-cyan)]">{post.readTime}</span>
                </div>
                <CardTitle className="text-[11px] leading-6 md:text-sm">{post.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 p-5 pt-0">
                <CardDescription className="text-[9px] leading-5">{post.excerpt}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="bg-[var(--pixel-card)] p-8 text-center">
          <p className="text-[10px] text-[var(--muted-foreground)]">{t('noResults')}</p>
        </Card>
      )}
    </div>
  )
}
