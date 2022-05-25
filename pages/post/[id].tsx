import { NextPage } from "next"
import Head from 'next/head'
import Layout from "../../components/Layout"
import Date from '../../components/Date'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}: any) {
  const postData = await getPostData(params.id)
  console.log(555, postData)
  return {
    props: {
      postData
    }
  }
}

const Post: NextPage<{ postData: PostDataWithContent }> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <div className='prose m-auto mb-8'>
        <h1>{ postData.title }</h1>
        <p>
          <Date dateString={ postData.date } />
        </p>
      </div>
      <article>
        <div className=' prose m-auto' dangerouslySetInnerHTML={{ __html: postData.contentHtml }}>

        </div>
      </article>
    </Layout>
  )
}

export default Post