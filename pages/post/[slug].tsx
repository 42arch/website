import { NextPage } from 'next'
import Layout from '../../components/layout'
import {
  getAllPostSlugs,
  getPostBySlug,
  PostDataWithHtml
} from '../../helpers/post'

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
      <article className="py-4 prose prose-strong:text-th-text-h prose-code:text-th-text-h prose-p:text-th-text prose-headings:text-th-text-h  m-auto">
        <section className="py-2">
          <h1 className="text-center">{postData.title}</h1>
        </section>
        <div dangerouslySetInnerHTML={{ __html: postData.html }}></div>
      </article>
    </Layout>
  )
}

export default Post
