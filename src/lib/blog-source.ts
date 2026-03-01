import type { AppLocale } from '@/i18n/config'
import { loader } from 'fumadocs-core/source'
import { blog } from '../../.source/server'

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  i18n: {
    languages: ['en', 'zh-CN'],
    defaultLanguage: 'en',
    parser: 'dir',
    hideLocale: 'always',
    fallbackLanguage: 'en',
  },
})

type BlogPage = ReturnType<typeof blogSource.getPages>[number]

export interface BlogPostListItem {
  slug: string
  title: string
  excerpt: string
  date: string | Date
  category: string
  readTime: string
  tags: string[]
  url: string
}

export function normalizeBlogSlug(slug: string) {
  return slug.replace(/\.mdx$/i, '')
}

export function normalizeBlogDateInput(date: string | Date) {
  if (date instanceof Date)
    return date

  const normalizedDate = date.includes('T') ? date : date.replace(' ', 'T')
  return new Date(normalizedDate)
}

function parseBlogDate(date: string | Date) {
  const timestamp = normalizeBlogDateInput(date).getTime()

  return Number.isNaN(timestamp) ? 0 : timestamp
}

function estimateReadTime(rawContent: string, locale: AppLocale) {
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\s*/m, '')
  const contentWithoutCodeBlocks = contentWithoutFrontmatter.replace(/```[\s\S]*?```/g, ' ')
  const contentWithoutMathBlocks = contentWithoutCodeBlocks.replace(/\$\$[\s\S]*?\$\$/g, ' ')
  const contentWithoutInlineMath = contentWithoutMathBlocks.replace(/\$(.+?)\$/g, ' ')
  const plainText = contentWithoutInlineMath
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[>#*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const cjkCount = (plainText.match(/[\u3400-\u9FFF]/g) ?? []).length
  const latinWordCount = (plainText.match(/[a-z0-9]+(?:'[a-z0-9]+)*/gi) ?? []).length
  const readingUnits = cjkCount + latinWordCount
  const minutes = Math.max(1, Math.ceil(readingUnits / 220))

  return locale === 'zh-CN' ? `${minutes} 分钟` : `${minutes} min`
}

async function toListItem(page: BlogPage, locale: AppLocale): Promise<BlogPostListItem | null> {
  const rawSlug = page.slugs.at(-1)
  if (!rawSlug)
    return null

  const slug = normalizeBlogSlug(rawSlug)
  const rawText = await page.data.getText('raw')
  const readTime = estimateReadTime(rawText, locale)

  return {
    slug,
    title: page.data.title,
    excerpt: page.data.description ?? '',
    date: page.data.date,
    category: page.data.category ?? page.data.tags[0] ?? 'General',
    readTime,
    tags: page.data.tags,
    url: `/blog/${slug}`,
  }
}

export async function getBlogPosts(locale: AppLocale): Promise<BlogPostListItem[]> {
  const posts = await Promise.all(
    blogSource.getPages(locale).map(page => toListItem(page, locale)),
  )

  return posts
    .filter((post): post is BlogPostListItem => post !== null)
    .sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date))
}

export function getBlogPostPage(slug: string, locale: AppLocale) {
  const normalizedSlug = normalizeBlogSlug(slug)
  return blogSource.getPage([normalizedSlug], locale) ?? blogSource.getPage([`${normalizedSlug}.mdx`], locale)
}

export function getBlogStaticSlugs(): string[] {
  const slugs = blogSource
    .getPages()
    .map(page => page.slugs.at(-1))
    .filter((slug): slug is string => Boolean(slug))
    .map(normalizeBlogSlug)

  return Array.from(new Set(slugs))
}
