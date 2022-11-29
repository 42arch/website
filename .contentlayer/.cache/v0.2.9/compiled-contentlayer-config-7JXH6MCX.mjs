// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

// lib/rehypePrettyCode.ts
var rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  }
};

// contentlayer.config.js
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    slug: {
      type: "string",
      description: "The slug of the post",
      required: true
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
      required: false
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The tags of the post",
      required: false
    },
    category: {
      type: "string",
      description: "The category of the post",
      required: false
    },
    coverImage: {
      type: "string",
      description: "The coverImage of the post",
      required: false
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `${post._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "_posts",
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [(rehypePrettyCode, rehypePrettyCodeOptions)]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7JXH6MCX.mjs.map
