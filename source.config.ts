import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import { defineCollections, defineConfig, frontmatterSchema, getDefaultMDXOptions } from 'fumadocs-mdx/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { z } from 'zod'

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
  mdxOptions: getDefaultMDXOptions({

  }),
})

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        // transformerRemoveNotationEscape(),
      ],
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: v => [rehypeKatex, ...v],
  },
})
