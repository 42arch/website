import type { Metadata } from 'next'
import * as Twoslash from 'fumadocs-twoslash/ui'
import { notFound } from 'next/navigation'
import { BlogApp } from '@/components/apps/blog'
import { MdxCodeBlock } from '@/components/mdx/code-block'
import { blogSource } from '@/lib/source'

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

  return {
    title: `${page.data.title} — Blog.app`,
    description: page.data.intro,
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

  return (
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
  )
}
