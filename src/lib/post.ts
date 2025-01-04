import { allPosts } from 'content-collections'

const isProduction = process.env.NODE_ENV === 'production'

export function getPosts() {
  const posts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((post) => {
      if (isProduction) {
        return post.published
      }
      return true
    })

  return posts
}
