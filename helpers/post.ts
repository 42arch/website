import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from './markdown'

export type PostMetaData = {
  title: string
  slug: string
  date: number
  category: string
  tags: string[]
  excerpt: string
  coverImage: string
}

export type PostData = PostMetaData & {
  id: string
}

export type PostDataWithHtml = PostMetaData & {
  html: string
}

const postsDirectory = path.join(process.cwd(), '_posts')

export const getSortedPostList = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostList: PostData[] = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterRes = matter(fileContents)

    if (matterRes.data.date) {
      const date = new Date(matterRes.data.date).getTime()
      matterRes.data.date = date
    }

    return {
      id,
      ...(matterRes.data as PostMetaData)
    }
  })
  return allPostList
}

export const getAllPostSlugs = () => {
  const allPostsData = getSortedPostList()
  return allPostsData.map((i) => ({
    params: {
      slug: i.slug || i.id
    }
  }))
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const { data, content } = matter(fileContents)
  // if (data.date) {
  //   const date = new Date(data.date)
  // }
  const html = await markdownToHtml(content)

  // console.log(88888, html)
  return {
    id,
    html,
    ...(data as PostMetaData)
  }
}

export const getPostBySlug = async (slug: string) => {
  const allPostsData = getSortedPostList()
  const found = allPostsData.find(
    (post) => post.slug === slug || post.id === slug
  )
  console.log(656666666, slug, found)

  if (found) {
    return await getPostData(found.id)
  }
}
