import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config'
import { rehypeCode } from 'fumadocs-core/mdx-plugins'
import { z } from 'zod'

export const writing = defineDocs({
  dir: 'content/writing',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().or(z.date()).optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
    }),
  },
})

export const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().or(z.date()).optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        },
      ],
    ],
  },
})
