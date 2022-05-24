import { NextPage } from 'next'
import Link from 'next/link'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import { getSortedPosts, PostData } from '../../helpers/posts'

export const getStaticProps = () => {
  const posts = getSortedPosts()
  console.log(2333, posts)
  return {
    props: {
      posts
    }
  }
}

const PostIndex: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <Layout>
      <article>
        <div className='prose m-auto'>
          <div className=' h-20'>
            My Blog
          </div>
          <ul>
            {
              posts.map(post => (
                <li key={post.id} className=' '>
                  <Link href={`/post/${post.id}`}>
                    <a className=' text-lg no-underline hover:text-primary hover:underline'>{ post.title }</a>
                  </Link>
                  <br />
                  <small>
                    <Date dateString={ post.date } />
                  </small>
                </li>
              ))
            }
          </ul>
        </div>
      </article>
    </Layout>
  )
}
export default PostIndex