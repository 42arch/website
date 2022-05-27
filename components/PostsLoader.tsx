import { FunctionComponent, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PostData } from '../helpers/posts'
import Back2Top from './Back2Top'
import { PostItem } from './PostItem'

interface IPorps {
  posts: PostData[],
  loadSize: number
}

const PostsLoader: FunctionComponent<IPorps> = ({ posts, loadSize }) => {
  const [curPosts, setCurPosts] = useState(posts.slice(0, loadSize))
  const [hasMore, setHasMore] = useState(true)

  const loadMorePost = () => {
    const morePost = posts.slice(0, curPosts.length + loadSize)
    setCurPosts(morePost)
    if (morePost.length >= posts.length) {
      setHasMore(false)
    }
  }

  return (
  <InfiniteScroll dataLength={ curPosts.length } next={loadMorePost} hasMore={hasMore} loader={<h3>loading</h3>} endMessage={<h4>Nothing more to show</h4>}>
    <div>
      {
        curPosts.map(post => (
          <PostItem key={ post.id } post={ post }></PostItem>
        ))
      }
    </div>
    <Back2Top />
  </InfiniteScroll>
  )
}

export default PostsLoader