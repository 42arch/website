import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { z } from 'zod'

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.union([z.string(), z.date()]),
      category: z.string().optional(),
      readTime: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: false,
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: ['js', 'jsx', 'ts', 'tsx', 'glsl', 'diff'],
    },
    remarkPlugins: plugins => [remarkMath, ...plugins],
    rehypePlugins: plugins => [rehypeKatex, ...plugins],
  },
})
