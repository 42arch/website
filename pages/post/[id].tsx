import { NextPage } from "next"
import Link from "next/link"
import Head from 'next/head'
import Date from '../../components/DateFormater'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back2Prev from "../../components/Back2Prev"
import CoverImage from "../../components/CoverImage"
import Back2Top from "../../components/Back2Top"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const post = await getPostData(params.id)
  return {
    props: {
      post
    }
  }
}

const Post: NextPage<{ post: PostDataWithContent }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <div className="prose dark:prose-invert m-auto mb-8">
        <div>
          {
            post.coverImage && (
              <CoverImage src={ post.coverImage } width={1240} height={620} title={ post.title }></CoverImage>
            )
          }
          <h1 className="mt-8">{ post.title }</h1>
          <p>
            <Date dateString={ post.date } />
            <a className="mx-8 opacity-80">{ `#${ post.category }` }</a>
          </p>
        </div>
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
          <p className="font-mono my-8 text-center text-xl opacity-80">
            -- EOF --
          </p>
        </article>
        <div className="flex flex-wrap justify-evenly my-8">
          {
            post.tags && post.tags.map(tag => (
              <Link key={tag} href={`/post/tag/${tag}`}>
                <a className="mx-4 font-mono hover:opacity-90" >{ `# ${tag}` }</a>
              </Link>
            ))
          }
        </div>
        <Back2Prev/>
        <Back2Top/>
      </div>
    </>
  )
}

export default Post