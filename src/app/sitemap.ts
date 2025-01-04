import { getPosts } from '@/lib/post'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const links: MetadataRoute.Sitemap = [
    {
      url: 'https://starllow.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://starllow.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: 'https://starllow.com/shuo',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    },
    {
      url: 'https://starllow.com/about',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    }
  ]

  const posts = getPosts()

  posts.forEach((post) => {
    links.push({
      url: `https://starllow.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'daily',
      priority: 0.9
    })
  })

  return links
}
