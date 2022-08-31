import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { markdownToHtml } from './markdown'
// import * as dayjs from 'dayjs'
import { PostMetaData, Tag } from "./types"

export type PostData = PostMetaData & {
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
    if(matterRes.data.date) {
      const date = new Date(matterRes.data.date).getTime()
      matterRes.data.date = date
    }
    return {
      id,
      ...(matterRes.data as PostMetaData)
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
  const tags: Tag[] = []
  allPostsData.forEach(post => {
    if(post.tags) {
      post.tags.forEach(tag => {
        const exist = tags.find((t) => t.label === tag)
        if(exist) {
          exist.total++
        } else {
          tags.push({label: tag, total: 1})
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

export const getAllPostSlugs = () => {
  const allPostsData = getAllPosts()
  return allPostsData.map((i) => (
    {
      params: {
        slug: i.slug || i.id
      }
    }
  ))
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

export const getPostBySlug = (slug: string) => {
  const allPostsData = getAllPosts()
  const found = allPostsData.find((post) => post.slug === slug || post.id === slug)
  if(found) {
    return getPostData(found.id)
  }
}


export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectiry, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const { data, content } = matter(fileContents)
  if(data.date) {
    const date = new Date(data.date)
    // data.date = format(date, 'LLLL d, yyyy')
  }
  const contentHtml = await markdownToHtml(content)
  return {
    id,
    contentHtml,
    ...(data as PostMetaData)
  }
}