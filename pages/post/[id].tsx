import { NextPage } from "next"
import Head from 'next/head'
import Date from '../../components/DateFormater'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back from "../../components/Back"
import Link from "next/link"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const Post: NextPage<{ postData: PostDataWithContent }> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <div className="prose dark:prose-invert m-auto mb-8">
        <div>
          <h1>{ postData.title }</h1>
          <p>
            <Date dateString={ postData.date } />
            <a className="mx-8 opacity-80">{ `#${ postData.category }` }</a>
          </p>
        </div>
        <article>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
          <p className="font-mono my-8 text-center text-xl">-- EOF --</p>
        </article>
        <div className="flex flex-wrap justify-evenly my-8">
          {
            postData.tags.map(tag => (
              <Link key={tag} href={`/post/tag/${tag}`}>
                <a className="mx-4 font-mono hover:opacity-90" >{ `# ${tag}` }</a>          
              </Link>
            ))
          }
        </div>
        <Back />
      </div>
    </>
  )
}

export default Post