import { NextPage } from "next"
import PostsLoader from "../../../components/PostsLoader"
import { getAllPostTags, getSortedPostsByTag, PostData } from "../../../helpers/posts"

export async function getStaticPaths() {
  const tags = getAllPostTags()
  const paths = tags.map(tag => ( `/post/tag/${tag}` ))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = ({ params }: any) => {
  const posts = getSortedPostsByTag(params.slug)
  return {
    props: {  
      posts,
      tag: params.slug
    }
  }
}

const PostsByTag: NextPage<{ posts: PostData[], tag: string }> = ({ posts, tag }) => {
  return (
    <article>
      <div className='prose dark:prose-invert m-auto'>
        <div className='h-20 text-center'>
          <p className="text-2xl border-0 mx-4 font-mono">{ `# ${tag}` }</p>
        </div>
        <PostsLoader posts={ posts } loadSize={ 5 }/>
      </div>
    </article>
  )
}

export default PostsByTag