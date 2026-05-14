// source.config.ts
import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { rehypeCode } from "fumadocs-core/mdx-plugins";
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
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark"
          }
        }
      ]
    ]
  }
});
export {
  source_config_default as default,
  notes,
  writing
};
