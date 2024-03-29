import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import { codeImport } from 'remark-code-import'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import { getHighlighter, loadTheme } from 'shiki'
import path from 'path'
import { s } from 'hastscript'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `post/**/*.mdx`,
  contentType: 'mdx',
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
    cover: {
      type: 'string',
      required: false,
      description: 'The cover of the post',
      default: '/images/default-cover.jpg'
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: false
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: false
    },
    lang: {
      type: 'string',
      default: 'en',
      description: 'The language of the post',
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
  filePathPattern: `note/**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the note',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the note',
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
      resolve: (post) => `post/${post._raw.flattenedPath}`
    },
    slugAsParams: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/')
    }
  }
}))

const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: `about.mdx`,
  contentType: 'mdx',
  fields: {
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    }
  }
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Note, About],
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
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
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
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3'],
          properties: { class: 'heading-link !text-primary' },
          content: s(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              width: '24',
              height: '24',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'aria-label': 'Anchor link'
            },
            [
              s('line', { x1: '4', y1: '9', x2: '20', y2: '9' }),
              s('line', { x1: '4', y1: '15', x2: '20', y2: '15' }),
              s('line', { x1: '10', y1: '3', x2: '8', y2: '21' }),
              s('line', { x1: '16', y1: '3', x2: '14', y2: '21' })
            ]
          )
        }
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') {
              return
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
          }
        })
      },
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(
              path.join(process.cwd(), 'src/lib/vscode-theme.json')
            )
            return await getHighlighter({ theme })
          },
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          }
        }
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') {
              return
            }

            preElement.properties['__withMeta__'] =
              node.children.at(0).tagName === 'div'
            preElement.properties['__rawString__'] = node.__rawString__

            if (node.__src__) {
              preElement.properties['__src__'] = node.__src__
            }
          }
        })
      }
    ]
  }
})
