import { NextPage } from 'next'
import { FiFolder } from 'react-icons/fi'
import Layout from '@/layout'
import DateTime from '@/components/DateTime'
import {
  getAllPostSlugs,
  getPostBySlug,
  PostDataWithHtml
} from '@/helpers/post'

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostBySlug(params.slug)

  return {
    props: {
      postData
    }
  }
}

const Post: NextPage<{ postData: PostDataWithHtml }> = ({ postData }) => {
  return (
    <Layout>
      <article className="py-4 my-10 prose prose-strong:text-th-text-h prose-code:text-th-text-h prose-p:text-th-text prose-headings:text-th-text-h  m-auto">
        <section className="py-2">
          <h1 className="text-center">{postData.title}</h1>
          <p className="text-center text-sm">
            <DateTime datetime={postData.date} />
          </p>
          <p className="m-0 text-center text-sm">
            {postData.tags.map((tag, idx) => (
              <span key={idx} className="mr-4 hover:opacity-80 cursor-pointer">
                # {tag}
              </span>
            ))}
          </p>
        </section>
        <div dangerouslySetInnerHTML={{ __html: postData.html }}></div>
        <p className="text-center mt-10 mb-4">-- EOF --</p>
        <p className="flex items-center w-fit cursor-pointer hover:opacity-80">
          <FiFolder className="mr-2" />
          {postData.category}
        </p>
      </article>
    </Layout>
  )
}

export default Post
