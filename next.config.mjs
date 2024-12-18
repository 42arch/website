import createNextIntlPlugin from 'next-intl/plugin'

const currentTime = new Date().getTime()

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: currentTime
  }
}

export default withNextIntl(nextConfig)
