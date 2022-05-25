import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'



export const markdownToHtml = async (markdown: string): Promise<string>  => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(gfm)
    .use(prism)
    .process(markdown)

  return result.toString()
}