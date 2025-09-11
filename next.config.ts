import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX({
  configPath: './source.config.ts',
})

const currentTime = new Date().getTime().toString()

console.log(88888, currentTime)

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    buildTime: currentTime,
  },
  reactStrictMode: true,
}

export default withMDX(nextConfig)
