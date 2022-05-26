import InfiniteScroll from "react-infinite-scroll-component"
import { NextPage } from 'next'
import { getSortedPosts, PostData } from '../../helpers/posts'
import { useState } from "react"
import { PostItem } from "../../components/PostItem"
import PostsLoader from "../../components/PostsLoader"

export const getStaticProps = () => {
  const posts = getSortedPosts()
  return {
    props: {  
      posts
    }
  }
}

const PostIndex: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <article>
      <div className='prose dark:prose-invert m-auto flex justify-between'>
        <PostsLoader posts={ posts } loadSize={ 5 }/>
        <div className='h-20 w-64'>
          
        </div>
      </div>
    </article>
  )
}
export default PostIndex