import { NextPage } from "next"
import Link from "next/link"
import Head from 'next/head'
import Date from '../../components/DateFormater'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back2Prev from "../../components/Back2Prev"
import CoverImage from "../../components/post/CoverImage"
import Back2Top from "../../components/Back2Top"
import Giscus from "@giscus/react"
import { FiCalendar, FiFolder, FiTag } from "react-icons/fi"
import DateFormater from "../../components/DateFormater"
import Metadata from "../../components/post/Metadata"

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
          <Metadata post={ post } />
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
        <Giscus
          id="comments"
          repo="REND42/giscus-content"
          repoId="R_kgDOHtv2FQ"
          category="Announcements"
          categoryId="DIC_kwDOHtv2Fc4CQbKi"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="dark_dimmed"
          lang="en"
          loading="lazy"
        />
        <Back2Top/>
      </div>
    </>
  )
}

export default Post