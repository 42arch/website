const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-prism")],
    rehypePlugins: [],
  },
})
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
})
