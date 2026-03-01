import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'
import createNextIntlPlugin from 'next-intl/plugin'

const currentTime = new Date().getTime().toString()

const withMDX = createMDX()
const nextConfig: NextConfig = {
  env: {
    buildTime: currentTime,
  },
  reactStrictMode: true,
  reactCompiler: true,
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(withMDX(nextConfig))
