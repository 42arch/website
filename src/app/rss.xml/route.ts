import { NextResponse } from 'next/server'
import RSS from 'rss'
import { site } from '@/config'
import { posts } from '@/lib/source'

export const dynamic = 'force-static'

export async function GET() {
  const allPosts = posts.getPages()
  const sorted = [...allPosts].sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0).getTime()
    const dateB = new Date((b.data as any).date || 0).getTime()
    return dateB - dateA
  })

  const baseUrl = site.url

  const feed = new RSS({
    title: site.name,
    description: site.description,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    language: site.locale || 'en-US',
    pubDate: new Date(),
  })

  sorted.forEach((post) => {
    feed.item({
      title: post.data.title,
      description: post.data.description || '',
      url: `${baseUrl}/posts/${post.slugs.join('/')}`,
      guid: `${baseUrl}/posts/${post.slugs.join('/')}`,
      date: (post.data as any).date ? new Date((post.data as any).date) : new Date(),
    })
  })

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
