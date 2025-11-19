import RSS from 'rss'
import { getPages } from '@/lib/source'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const feed = new RSS({
    title: 'Starllow',
    description: 'Starllow Lab, we build creative web apps!',
    site_url: 'https://starllow.com',
    feed_url: `https://starllow.com/feed.xml`,
    copyright: `${new Date().getFullYear()} Starllow Lab`,
    language: 'en',
    pubDate: new Date(),
  })

  const posts = getPages()
  const sortedPosts = posts.filter(post => !post.data.draft).sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime()
  })

  sortedPosts.forEach((post) => {
    feed.item({
      title: post.data.title,
      guid: `https://starllow.com/blog/${post.slugs[0]}`,
      url: `https://starllow.com/blog/${post.slugs[0]}`,
      date: post.data.date,
      description: post.data.description ?? '',
      author: post.data.author,
      categories: [post.data.category],
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=60, s-maxage=${revalidate}`,
      'CDN-Cache-Control': `max-age=${revalidate}`,
      'Cloudflare-CDN-Cache-Control': `max-age=${revalidate}`,
      'Vercel-CDN-Cache-Control': `max-age=${revalidate}`,
    },
  })
}
