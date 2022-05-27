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

export const getAllPosts = () => {
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
  return allPostsData
}

export const getSortedPosts = () => {
  const allPostsData = getAllPosts()
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

export const getSortedPostsByTag = (tag: string) => {
  const allSortedPosts = getSortedPosts()
  return allSortedPosts.filter(post => (post.tags && post.tags.includes(tag)))
}

export const getAllPostTags = () => {
  const allPostsData = getAllPosts()
  const tags: string[] = []
  allPostsData.forEach(post => {
    if(post.tags) {
      post.tags.forEach(tag => {
        if(!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
  })
  return tags
}

export const getAllPostsCategories = () => {
  const allPostsData = getAllPosts()
  const categories: string[] = []
  allPostsData.forEach(post => {
    if(post.category) {
      categories.push(post.category)
    }
  })
  return categories
}


export const getSortedPostsByCategory = (category: string) => {
  const allSortedPosts = getSortedPosts()
  return allSortedPosts.filter(post => {
    return (post.category && post.category === category)
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
  console.log('test date', data.date)
  if(data.date && data.date instanceof Date) {
    data.date = new Date(data.date).toUTCString()
  }
  const contentHtml = await markdownToHtml(content)
  return {
    id,
    contentHtml,
    ...(data as PostMeta)
  }
}