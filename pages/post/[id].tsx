import { NextPage } from "next"
import Link from "next/link"
import Head from 'next/head'
import Date from '../../components/DateFormater'
import { getAllPostIds, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back2Prev from "../../components/Back2Prev"
import CoverImage from "../../components/CoverImage"
import Back2Top from "../../components/Back2Top"
import Giscus from "@giscus/react"
import { FiCalendar, FiFolder, FiTag } from "react-icons/fi"
import DateFormater from "../../components/DateFormater"

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
          <small className="flex py-2">
            <p className="flex items-center">
              <FiCalendar className='w-4 h-4 mr-2'/>
              <DateFormater dateString={ post.date } />
            </p>
            <p className="cursor-pointer ml-6 flex justify-center items-center hover:opacity-80">
              <FiFolder className='w-4 h-4 mr-2'/>
              { post.category }
            </p>
            <p className="flex items-center ml-6 hover:opacity-80">
              <FiTag className='w-4 h-4 mr-2'/>
              {
                post.tags && post.tags.map((tag, idx) => (
                  <Link key={tag} href={`/post/tag/${tag}`}>
                    <span className="cursor-pointer mr-4" >{ tag }</span>
                  </Link>
                  // <span key={idx} className="cursor-pointer mr-4">{tag}</span>
                ))
              }
            </p>
          </small>
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