import { NextPage } from 'next'
import { getSortedPosts, PostData } from '../../helpers/posts'
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
      <div className='prose dark:prose-invert m-auto'>
        <PostsLoader posts={ posts } loadSize={ 5 }/>
        {/* <div className='h-20 w-64 hidden md:block'>
        </div> */}
      </div>
    </article>
  )
}
export default PostIndex