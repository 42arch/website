import type { MetadataRoute } from 'next'
import { getBlogPosts, normalizeBlogDateInput } from '@/lib/blog-source'

const SITE_URL = 'https://starllow.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const posts = await getBlogPosts('en')
  for (const post of posts) {
    links.push({
      url: `${SITE_URL}${post.url}`,
      lastModified: normalizeBlogDateInput(post.date),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  }

  return links
}
