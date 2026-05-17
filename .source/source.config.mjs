// source.config.ts
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";
var writing = defineDocs({
  dir: "content/writing",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().or(z.date()).optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional()
    })
  }
});
var notes = defineDocs({
  dir: "content/notes",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().or(z.date()).optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional()
    })
  }
});
var osTheme = {
  name: "os-theme",
  type: "dark",
  colors: {
    "editor.foreground": "var(--shiki-foreground)",
    "editor.background": "var(--shiki-background)"
  },
  tokenColors: [
    { scope: "keyword", settings: { foreground: "var(--shiki-token-keyword)" } },
    { scope: "string", settings: { foreground: "var(--shiki-token-string)" } },
    { scope: "comment", settings: { foreground: "var(--shiki-token-comment)" } },
    { scope: "constant", settings: { foreground: "var(--shiki-token-constant)" } },
    { scope: "parameter", settings: { foreground: "var(--shiki-token-parameter)" } },
    { scope: "function", settings: { foreground: "var(--shiki-token-function)" } },
    { scope: "punctuation", settings: { foreground: "var(--shiki-token-punctuation)" } },
    { scope: "link", settings: { foreground: "var(--shiki-token-link)" } }
  ]
};
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => {
      const filtered = v.filter((plugin) => {
        const pluginFunc = Array.isArray(plugin) ? plugin[0] : plugin;
        return pluginFunc !== rehypeCode;
      });
      return [
        rehypeKatex,
        ...filtered,
        [
          rehypeCode,
          {
            themes: {
              light: osTheme,
              dark: osTheme
            }
          }
        ]
      ];
    }
  }
});
export {
  source_config_default as default,
  notes,
  writing
};
