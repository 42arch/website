import type { NextConfig } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const pkgPath = path.resolve(process.cwd(), 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'fumadocs-ui'],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version || '0.1.0',
  },
}

export default withMDX(nextConfig)
