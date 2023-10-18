const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'unsplash.com']
  }
}
// module.exports = withContentlayer(nextConfig)
module.exports = withContentlayer(nextConfig)
