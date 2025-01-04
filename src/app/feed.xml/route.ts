import { getPosts } from '@/lib/post'
import { getUserLocale } from '@/services/locale'
import RSS from 'rss'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const locale = await getUserLocale()

  const feed = new RSS({
    title: 'Starllow',
    description: 'Starllow Lab, we build creative web apps!',
    site_url: 'https://starllow.com',
    feed_url: `https://starllow.com/feed.xml`,
    copyright: `${new Date().getFullYear()} Starllow`,
    language: `${locale}`,
    pubDate: new Date()
  })

  const posts = getPosts()

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `https://starllow.com/blog/${post.slug}`,
      url: `https://starllow.com/blog/${post.slug}`,
      date: post.date,
      description: post.summary ?? '',
      author: post.author,
      categories: [post.category]
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=60, s-maxage=${revalidate}`,
      'CDN-Cache-Control': `max-age=${revalidate}`,
      'Cloudflare-CDN-Cache-Control': `max-age=${revalidate}`,
      'Vercel-CDN-Cache-Control': `max-age=${revalidate}`
    }
  })
}
