import { BlogApp } from '@/components/apps/blog'
import { JsonLd } from '@/components/seo/json-ld'
import { pageMetadata, siteUrl } from '@/lib/site'
import { blogSource } from '@/lib/source'

const title = '博客'
const description = '关于图形学、开发工具与工程实践的长篇文章。'

export const metadata = pageMetadata(title, description, '/blog')

export default function BlogIndexPage() {
  const articles = blogSource.getPages().map(page => ({
    slug: page.slugs[0],
    title: page.data.title,
    date: page.data.date,
    category: page.data.category,
    intro: page.data.intro,
    tags: page.data.tags ?? [],
  }))

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': title,
          'description': description,
          'url': `${siteUrl}/blog`,
          'inLanguage': 'zh-CN',
          'blogPost': articles.map(article => ({
            '@type': 'BlogPosting',
            'headline': article.title,
            'description': article.intro,
            'url': `${siteUrl}/blog/${article.slug}`,
          })),
        }}
      />
      <BlogApp blogList={articles} />
    </>
  )
}
