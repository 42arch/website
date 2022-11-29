import { NextPage } from 'next'
import { FiFolder } from 'react-icons/fi'
import Layout from '@/layout'
import DateTime from '@/components/DateTime'
import { getAllPostSlugs, getPostBySlug, type Post } from '@/lib/post'

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const post = await getPostBySlug(params.slug)
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
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
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
