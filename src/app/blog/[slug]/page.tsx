import type { Metadata } from 'next'
import * as Twoslash from 'fumadocs-twoslash/ui'
import { notFound } from 'next/navigation'
import { BlogApp } from '@/components/apps/blog'
import { JsonLd } from '@/components/seo/json-ld'
import { MdxCodeBlock } from '@/components/mdx/code-block'
import { articleDate, pageMetadata, siteUrl } from '@/lib/site'
import { blogSource } from '@/lib/source'

export const dynamicParams = false

export function generateStaticParams() {
  return blogSource.getPages().map(page => ({ slug: page.slugs[0] }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = blogSource.getPage([slug])
  if (!page)
    return {}

  const path = `/blog/${slug}`
  const published = articleDate(page.data.date)

  return {
    ...pageMetadata(page.data.title, page.data.intro, path),
    keywords: page.data.tags,
    openGraph: {
      description: page.data.intro,
      publishedTime: published?.toISOString(),
      tags: page.data.tags,
      title: page.data.title,
      type: 'article',
      url: path,
    },
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = blogSource.getPage([slug])
  if (!page)
    notFound()

  const articles = blogSource.getPages().map(item => ({
    slug: item.slugs[0],
    title: item.data.title,
    date: item.data.date,
    category: item.data.category,
    intro: item.data.intro,
    tags: item.data.tags ?? [],
  }))
  const MDX = page.data.body

  const published = articleDate(page.data.date)?.toISOString()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': page.data.title,
          'description': page.data.intro,
          'datePublished': published,
          'dateModified': published,
          'inLanguage': 'zh-CN',
          'keywords': (page.data.tags ?? []).join(', '),
          'mainEntityOfPage': `${siteUrl}/blog/${slug}`,
          'url': `${siteUrl}/blog/${slug}`,
          'author': {
            '@type': 'Person',
            'name': 'Starllow',
            'url': siteUrl,
          },
        }}
      />
      <BlogApp
        currentSlug={slug}
        blogList={articles}
        renderedContent={<MDX components={{ ...Twoslash, pre: MdxCodeBlock }} />}
        currentArticle={{
          slug,
          title: page.data.title,
          date: page.data.date,
          category: page.data.category,
          intro: page.data.intro,
          tags: page.data.tags ?? [],
        }}
      />
    </>
  )
}
