import type { MetadataRoute } from 'next'
import { getPages } from '@/lib/source'

export default function sitemap(): MetadataRoute.Sitemap {
  const links: MetadataRoute.Sitemap = [
    {
      url: 'https://starllow.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://starllow.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://starllow.com/about',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ]

  const posts = getPages()
  const sortedPosts = posts.filter(post => !post.data.draft).sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime()
  })

  sortedPosts.forEach((post) => {
    links.push({
      url: `https://starllow.com/blog/${post.slugs[0]}`,
      lastModified: new Date(post.data.date),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  })

  return links
}
