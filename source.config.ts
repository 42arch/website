import { rehypeCode } from 'fumadocs-core/mdx-plugins'
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
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
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => {
      // Filter out Fumadocs' built-in rehypeCode plugin to prevent duplicate/conflicting highlighters
      const filtered = v.filter((plugin) => {
        const pluginFunc = Array.isArray(plugin) ? plugin[0] : plugin
        return pluginFunc !== rehypeCode
      })

      // Run rehypeKatex first to convert math formulas, then other default plugins, and finally our custom-themed code highlighter
      return [
        rehypeKatex,
        ...filtered,
        [
          rehypeCode,
          {
            themes: {
              light: osTheme,
              dark: osTheme,
            },
          },
        ],
      ]
    },
  },
})
