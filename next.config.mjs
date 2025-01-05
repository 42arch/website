import { withContentCollections } from '@content-collections/next'
import createNextIntlPlugin from 'next-intl/plugin'

const currentTime = new Date().getTime()

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: currentTime
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
}

export default withContentCollections(withNextIntl(nextConfig))
