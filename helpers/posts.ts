import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { markdownToHtml } from './markdown'

export type PostMeta = {
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  coverImage: string
}

export type PostData = PostMeta & {
  id: string
}

export type PostDataWithContent = PostData & {
  contentHtml: string
}

const postsDirectiry = path.join(process.cwd(), '_posts')

export const getSortedPosts = () => {
  const fileNames = fs.readdirSync(postsDirectiry)
  const allPostsData: PostData[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectiry, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    const matterRes = matter(fileContent)
    if(matterRes.data.date && matterRes.data.date instanceof Date) {
      matterRes.data.date = matterRes.data.date.toISOString()
    }
    return {
      id,
      ...(matterRes.data as PostMeta)
    }
  })
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if(a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectiry)

  return fileNames.map(fileName => (
    {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  ))
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectiry, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const { data, content } = matter(fileContents)
  const contentHtml = await markdownToHtml(content)
  return {
    id,
    contentHtml,
    ...(data as PostMeta)
  }
}