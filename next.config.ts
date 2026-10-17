import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const withMDX = createMDX()

const nextConfig: NextConfig = {
  serverExternalPackages: ['typescript'],
}

export default withNextIntl(withMDX(nextConfig))
