import type { MetadataRoute } from 'next'
import { site } from '@/config'
import { notes, writing } from '@/lib/source'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url

  // 1. 静态主路由
  const staticRoutes = [
    '',
    '/projects',
    '/writing',
    '/notes',
    '/gallery',
    '/experiments',
    '/about',
    '/rss',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. 动态 MDX 技术文章路由
  const writingRoutes = writing.getPages().map((page) => {
    const lastMod = (page.data as any).date
      ? new Date((page.data as any).date)
      : new Date()

    return {
      url: `${baseUrl}/writing/${page.slugs.join('/')}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // 3. 动态 MDX 开发者笔记路由
  const notesRoutes = notes.getPages().map((page) => {
    const lastMod = (page.data as any).date
      ? new Date((page.data as any).date)
      : new Date()

    return {
      url: `${baseUrl}/notes/${page.slugs.join('/')}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...writingRoutes, ...notesRoutes]
}
