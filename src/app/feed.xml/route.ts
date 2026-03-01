import RSS from 'rss'
import { getBlogPosts, normalizeBlogDateInput } from '@/lib/blog-source'

const SITE_URL = 'https://starllow.com'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const feed = new RSS({
    title: 'Starllow',
    description: 'Starllow Lab, we build creative web apps!',
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    copyright: `${new Date().getFullYear()} Starllow Lab`,
    language: 'en',
    pubDate: new Date(),
  })

  const posts = await getBlogPosts('en')
  for (const post of posts) {
    feed.item({
      title: post.title,
      guid: `${SITE_URL}${post.url}`,
      url: `${SITE_URL}${post.url}`,
      date: normalizeBlogDateInput(post.date),
      description: post.excerpt,
      categories: [post.category],
    })
  }

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
