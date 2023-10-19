const { withContentlayer } = require('next-contentlayer')
/** @type {import('next').NextConfig} */

const currentTime = new Date().getTime()
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: currentTime
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'unsplash.com']
  }
}
module.exports = withContentlayer(nextConfig)
