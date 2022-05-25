import { NextPage } from "next"
import Head from 'next/head'
import Layout from "../../components/Layout"
import Date from '../../components/Date'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back from "../../components/Back"

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
      <div className='prose dark:prose-invert m-auto mb-8'>
        <h1>{ postData.title }</h1>
        <p className="">
          <Date dateString={ postData.date } />
          <a className="mx-8 opacity-80">{ `#${ postData.category }` }</a>
        </p>
      </div>
      <article>
        <div className='prose dark:prose-invert m-auto' dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        <p className="prose font-mono m-auto my-8 text-center text-xl">-- EOF --</p>
      </article>
      <div className="prose m-auto flex flex-wrap justify-evenly my-8">
        {
          postData.tags.map(tag => (
            <a className="mx-4 font-mono hover:opacity-90" key={tag}>{ `# ${tag}` }</a>
          ))
        }
      </div>
      <Back />
    </Layout>
  )
}

export default Post