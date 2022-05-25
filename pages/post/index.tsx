import InfiniteScroll from "react-infinite-scroll-component"
import { NextPage } from 'next'
import Link from 'next/link'
import CoverImage from '../../components/CoverImage'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import { getSortedPosts, PostData } from '../../helpers/posts'
import { useState } from "react"

export const getStaticProps = () => {
  const posts = getSortedPosts()
  return {
    props: {  
      posts
    }
  }
}

const fetcher = (allPosts: PostData[], page: number, size: number) => {
  return allPosts.slice(0, page * size)
}

const PostIndex: NextPage<{ posts: PostData[] }> = ({ posts }) => {

  const [curPosts, setCurPosts] = useState(posts.slice(0, 4))
  const [hasMore, setHasMore] = useState(true)

  const loadMorePost = () => {
    const morePost = posts.slice(0, curPosts.length + 4)
    setCurPosts(morePost)
    if (morePost.length >= posts.length) {
      setHasMore(false)
    }
  }

  return (
    <Layout>
      <article >
        <div className='prose dark:prose-invert m-auto'>
          <div className='h-20'>
            My Blog
          </div>
          <InfiniteScroll dataLength={ curPosts.length } next={loadMorePost} hasMore={hasMore} loader={<h3>loading</h3>} endMessage={<h4>Nothing more to show</h4>}>
            <div>
              {
                curPosts.map(post => (
                  <div key={post.id} className='no-underline py-4'>
                    {
                      post.coverImage && (
                        <CoverImage src={ post.coverImage } slug={ post.id } width={1240} height={620} title={ post.title }></CoverImage>
                      )
                    }
                    <Link href={`/post/${post.id}`}>
                      <p className='cursor-pointer text-2xl my-2 leading-tight no-underline hover:opacity-80'>{ post.title }</p>
                    </Link>
                    <small>
                      <Date dateString={ post.date } />
                    </small>
                    <p>
                      { post.excerpt }
                    </p>
                  </div>
                ))
              }
            </div>
          </InfiniteScroll>
        </div>
      </article>
    </Layout>
  )
}
export default PostIndex