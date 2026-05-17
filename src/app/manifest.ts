import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Folio OS — Developer Workspace',
    short_name: 'Folio OS',
    description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a digital operating system.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f2eb',
    theme_color: '#f5f2eb',
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
