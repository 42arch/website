import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs'
import { transformerTwoslash } from 'fumadocs-twoslash'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { z } from 'zod'

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: z.object({
      title: z.string(),
      date: z.string().optional(),
      category: z.string(),
      intro: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  },
})

export const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: z.object({
      title: z.string(),
      date: z.string(),
      category: z.string(),
      intro: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: plugins => [rehypeKatex, ...plugins],
    rehypeCodeOptions: {
      addLanguageClass: true,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
      ],
      langs: ['js', 'jsx', 'ts', 'tsx', 'bash'],
    },
  },
})
