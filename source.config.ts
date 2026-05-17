import { rehypeCode } from 'fumadocs-core/mdx-plugins'
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config'
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

const osTheme = {
  name: 'os-theme',
  type: 'dark',
  colors: {
    'editor.foreground': 'var(--shiki-foreground)',
    'editor.background': 'var(--shiki-background)',
  },
  tokenColors: [
    { scope: 'keyword', settings: { foreground: 'var(--shiki-token-keyword)' } },
    { scope: 'string', settings: { foreground: 'var(--shiki-token-string)' } },
    { scope: 'comment', settings: { foreground: 'var(--shiki-token-comment)' } },
    { scope: 'constant', settings: { foreground: 'var(--shiki-token-constant)' } },
    { scope: 'parameter', settings: { foreground: 'var(--shiki-token-parameter)' } },
    { scope: 'function', settings: { foreground: 'var(--shiki-token-function)' } },
    { scope: 'punctuation', settings: { foreground: 'var(--shiki-token-punctuation)' } },
    { scope: 'link', settings: { foreground: 'var(--shiki-token-link)' } },
  ],
}

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          themes: {
            light: osTheme,
            dark: osTheme,
          },
        },
      ],
    ],
  },
})
