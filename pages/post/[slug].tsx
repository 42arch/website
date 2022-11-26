import { NextPage } from 'next'
import { FiFolder } from 'react-icons/fi'
import Layout from '@/layout'
import { allPosts, Post } from '@/contentlayer/generated'
import DateTime from '@/components/DateTime'

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => `/post/${post.url}`)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const post: Post | undefined = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  )

  return {
    props: {
      post
    }
  }
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <Layout>
      <article className="py-4 my-10 prose prose-strong:text-th-text-h prose-code:text-th-text-h prose-p:text-th-text prose-headings:text-th-text-h  m-auto">
        <section className="py-2">
          <h1 className="text-center">{post.title}</h1>
          <p className="text-center text-sm">
            <DateTime datetime={post.date} />
          </p>
          <p className="m-0 text-center text-sm">
            {post.tags?.map((tag, idx) => (
              <span key={idx} className="mr-4 hover:opacity-80 cursor-pointer">
                # {tag}
              </span>
            ))}
          </p>
        </section>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }}></div>
        <p className="text-center mt-10 mb-4">-- EOF --</p>
        <p className="flex items-center w-fit cursor-pointer hover:opacity-80">
          <FiFolder className="mr-2" />
          {post.category}
        </p>
      </article>
    </Layout>
  )
}

export default Post
