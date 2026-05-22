import RSS from 'rss'
import { codeToHtml } from 'shiki'
import { RssPanel } from '@/components/panels/rss-panel'
import { siteConfig } from '@/config'
import { writing } from '@/lib/source'

export const metadata = {
  title: 'RSS Feed',
  description: 'Subscribe to our content updates using standard RSS 2.0 reader apps.',
}

export default async function RssPage() {
  const posts = writing.getPages()
  const sorted = [...posts].sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0).getTime()
    const dateB = new Date((b.data as any).date || 0).getTime()
    return dateB - dateA
  })

  const baseUrl = siteConfig.site.url

  // Generate the actual full RSS feed preview using the 'rss' library
  const feed = new RSS({
    title: siteConfig.site.name,
    description: siteConfig.site.description,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    language: siteConfig.site.locale || 'en-US',
    pubDate: new Date(),
  })

  sorted.forEach((post) => {
    feed.item({
      title: post.data.title,
      description: post.data.description || '',
      url: `${baseUrl}/writing/${post.slugs.join('/')}`,
      guid: `${baseUrl}/writing/${post.slugs.join('/')}`,
      date: (post.data as any).date ? new Date((post.data as any).date) : new Date(),
    })
  })

  const rawXml = feed.xml({ indent: true })

  // Custom theme mapping tokens to our unified CSS variables
  const osTheme = {
    name: 'os-theme',
    type: 'dark' as const,
    colors: {
      'editor.foreground': 'var(--shiki-foreground)',
      'editor.background': 'var(--shiki-background)',
    },
    tokenColors: [
      { scope: 'keyword', settings: { foreground: 'var(--shiki-token-keyword)' } },
      { scope: 'string', settings: { foreground: 'var(--shiki-token-string)' } },
      { scope: 'comment', settings: { foreground: 'var(--shiki-token-comment)' } },
      { scope: 'constant', settings: { foreground: 'var(--shiki-token-constant)' } },
      { scope: 'parameter', settings: { foreground: 'var(--shiki-token-parameter)' } },
      { scope: 'function', settings: { foreground: 'var(--shiki-token-function)' } },
      { scope: 'punctuation', settings: { foreground: 'var(--shiki-token-punctuation)' } },
      { scope: 'link', settings: { foreground: 'var(--shiki-token-link)' } },
    ],
  }

  // Highlight the generated XML using Shiki with our dynamic variable theme
  const highlightedHtml = await codeToHtml(rawXml, {
    lang: 'xml',
    theme: osTheme,
  })

  return (
    <RssPanel
      rawXml={rawXml}
      highlightedHtml={highlightedHtml}
    />
  )
}
