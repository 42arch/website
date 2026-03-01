import { getLocale, getTranslations } from 'next-intl/server'
import { BlogList } from '@/components/blog-list'
import { Badge } from '@/components/ui/badge'
import { resolveLocale } from '@/i18n/config'
import { getBlogPosts } from '@/lib/blog-source'

export default async function BlogPage() {
  const locale = resolveLocale(await getLocale())
  const t = await getTranslations('BlogPage')
  const posts = await getBlogPosts(locale)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pt-8 pb-14">
      <header className="pixel-fade-in space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">{t('title')}</Badge>
        </div>
        <p className="pixel-copy">
          {'> '}
          {t('description')}
        </p>
      </header>

      <BlogList locale={locale} posts={posts} />
    </div>
  )
}
