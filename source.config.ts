import { createHighlighterCore } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'
import bash from '@shikijs/langs/bash'
import c from '@shikijs/langs/c'
import cpp from '@shikijs/langs/cpp'
import csharp from '@shikijs/langs/csharp'
import css from '@shikijs/langs/css'
import glsl from '@shikijs/langs/glsl'
import go from '@shikijs/langs/go'
import html from '@shikijs/langs/html'
import javascript from '@shikijs/langs/javascript'
import json from '@shikijs/langs/json'
import jsx from '@shikijs/langs/jsx'
import markdown from '@shikijs/langs/markdown'
import python from '@shikijs/langs/python'
import rust from '@shikijs/langs/rust'
import shellscript from '@shikijs/langs/shellscript'
import sql from '@shikijs/langs/sql'
import toml from '@shikijs/langs/toml'
import tsx from '@shikijs/langs/tsx'
import typescript from '@shikijs/langs/typescript'
import wgsl from '@shikijs/langs/wgsl'
import xml from '@shikijs/langs/xml'
import yaml from '@shikijs/langs/yaml'
import { createRehypeCode } from 'fumadocs-core/mdx-plugins/rehype-code.core'
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { z } from 'zod'

export const posts = defineDocs({
  dir: 'content/posts',
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
  type: 'dark' as const,
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

function remarkMermaid() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (!node)
        return
      if (node.children && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i]
          if (child && child.type === 'code' && child.lang === 'mermaid') {
            node.children[i] = {
              type: 'mdxJsxFlowElement',
              name: 'Mermaid',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'chart',
                  value: child.value,
                },
              ],
              children: [],
            }
          }
          else {
            walk(child)
          }
        }
      }
    }
    walk(tree)
  }
}

const rehypeCode = createRehypeCode(async () => {
  const highlighter = await createHighlighterCore({
    langs: [
      javascript,
      typescript,
      jsx,
      tsx,
      html,
      css,
      json,
      markdown,
      python,
      c,
      cpp,
      csharp,
      rust,
      go,
      sql,
      toml,
      yaml,
      xml,
      bash,
      shellscript,
      glsl,
      wgsl,
    ],
    themes: [osTheme],
    engine: createJavaScriptRegexEngine(),
  })
  return {
    highlighter,
    options: {
      themes: {
        light: osTheme,
        dark: osTheme,
      },
    },
  }
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: (v) => {
      // Filter out Fumadocs' built-in rehypeCode plugin to prevent duplicate/conflicting highlighters
      const filtered = v.filter((plugin) => {
        const pluginFunc = Array.isArray(plugin) ? plugin[0] : plugin
        return pluginFunc !== rehypeCode
      })

      return [
        rehypeKatex,
        ...filtered,
        rehypeCode,
      ]
    },
  },
})
