import type { Metadata } from 'next'
import { BlogApp } from '@/components/apps/blog-app'
import { blogSource } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Blog.app — Starllow.OS',
  description: '关于图形学、开发工具与工程实践的长篇文章。',
}

export default function BlogIndexPage() {
  const articles = blogSource.getPages().map(page => ({
    slug: page.slugs[0],
    title: page.data.title,
    date: page.data.date,
    category: page.data.category,
    intro: page.data.intro,
    tags: page.data.tags ?? [],
  }))

  return <BlogApp blogList={articles} />
}
