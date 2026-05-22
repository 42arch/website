import type { MetadataRoute } from 'next'
import { site } from '@/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Developer Workspace`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: site.backgroundColor,
    theme_color: site.themeColor,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
