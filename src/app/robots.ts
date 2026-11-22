import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
