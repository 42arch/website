import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import { codeImport } from 'remark-code-import'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { getHighlighter, loadTheme } from 'shiki'
import path from 'path'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: false
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => `${post._raw.flattenedPath}`
    },
    slugAsParams: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/')
    }
  }
}))

const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `notes/**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    type: {
      type: 'string',
      description: 'The type of the note',
      required: false
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => `blog/${post._raw.flattenedPath}`
    },
    slugAsParams: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/')
    }
  }
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Note],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(
              path.join(process.cwd(), 'src/lib/vscode-theme.json')
            )
            return await getHighlighter({ theme })
          },
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted']
          }
        }
      ]
    ]
  },
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(
              path.join(process.cwd(), 'src/lib/vscode-theme.json')
            )
            return await getHighlighter({ theme })
          },
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted']
          }
        }
      ]
    ]
  }
})
