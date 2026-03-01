import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { resolveLocale } from '@/i18n/config'
import { getBlogPosts } from '@/lib/blog-source'

export async function RecentPosts() {
  const locale = resolveLocale(await getLocale())
  const t = await getTranslations('RecentPosts')
  const recent = (await getBlogPosts(locale)).slice(0, 3)
  const dateFormatter = new Intl.DateTimeFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <section className="mx-auto mt-12 w-full max-w-3xl">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xs text-[var(--pixel-magenta)]">&gt;&gt;&gt;</span>
        <h2 className="text-sm text-[var(--pixel-magenta)]">{t('title')}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {recent.map(post => (
          <Link key={post.slug} href={post.url} className="block">
            <Card className="bg-[var(--pixel-card)]">
              <CardHeader className="space-y-3 p-4">
                <div className="flex flex-wrap items-center gap-2 text-[9px] text-[var(--muted-foreground)]">
                  <span className="text-[var(--pixel-yellow)]">
                    {t('category')}
                    {post.category}
                  </span>
                  <span>{dateFormatter.format(new Date(post.date))}</span>
                  <span className="text-[var(--pixel-cyan)]">{post.readTime}</span>
                </div>
                <CardTitle className="text-[11px] leading-6 md:text-sm">{post.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 p-4 pt-0">
                <CardDescription className="mt-0 text-[9px] leading-5 md:text-[10px]">
                  {post.excerpt}
                </CardDescription>
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

      <div className="mt-6 text-center">
        <Link href="/blog" className="inline-flex text-[11px] text-[var(--pixel-cyan)] hover:text-[var(--pixel-yellow)]">
          {t('viewAll')}
        </Link>
      </div>
    </section>
  )
}
