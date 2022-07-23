import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkSlug from 'remark-slug'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import remarkParse from 'remark-parse'
import rehypeRemark from 'rehype-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'


export const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = await unified()

    // .use(rehypeParse)
    // .use(rehypeRemark)
    .use(html)
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})


    // .use(rehypeAutolinkHeadings)
    .use(gfm)
    .use(prism)
    .use(remarkToc, { tight: true, ordered: true, prefix: 'user-content-' })

    // .use(remarkSlug)
    .process(markdown)
  return result.toString()
}