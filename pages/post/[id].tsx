import { NextPage } from "next"
import Head from 'next/head'
import Layout from "../../components/Layout"
import { getAllPostIds, getPostData, PostData } from "../../helpers/posts"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}: any) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const Post: NextPage<{ postData: PostData }> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <article>
        <h1>{ postData.title }</h1>
      </article>
    </Layout>
  )
}

export default Post