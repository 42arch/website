import type { MetadataRoute } from 'next'
import { blogSource } from '@/lib/source'
import { articleDate, siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

const staticRoutes = [
  { path: '/', priority: 1 },
  { path: '/blog', priority: 0.9 },
  { path: '/notes', priority: 0.8 },
  { path: '/projects', priority: 0.8 },
  { path: '/gallery', priority: 0.6 },
  { path: '/handbook', priority: 0.5 },
  { path: '/contact', priority: 0.4 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map(route => ({
    changeFrequency: 'weekly' as const,
    priority: route.priority,
    url: `${siteUrl}${route.path}`,
  }))

  const posts = blogSource.getPages().map((page) => {
    const slug = page.slugs[0]
    return {
      changeFrequency: 'monthly' as const,
      lastModified: articleDate(page.data.date),
      priority: 0.7,
      url: `${siteUrl}/blog/${slug}`,
    }
  })

  return [...pages, ...posts]
}
