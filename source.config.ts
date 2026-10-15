import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { z } from 'zod'

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

export default defineConfig()
