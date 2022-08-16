import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import Head from 'next/head'
import Giscus from "@giscus/react"
import { getAllPostIds, getAllPostSlugs, getPostBySlug, getPostData, PostDataWithContent } from "../../helpers/posts"
import Back2Prev from "../../components/Back2Prev"
import CoverImage from "../../components/post/CoverImage"
import Metadata from "../../components/post/Metadata"
import AppContext from "../../context/AppContext"
import SideMenu from "../../components/SideMenu"

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  console.log('paapapa', params)
  const post = await getPostBySlug(params.slug)
  return {
    props: {
      post
    }
  }
}

const Post: NextPage<{ post: PostDataWithContent }> = ({ post }) => {

  const { curTheme } = useContext(AppContext)
  const [giscusTheme, setGiscusTheme] = useState<string>('')

  useEffect(() => {
    if(curTheme === 'dark') {
      setGiscusTheme('dark_tritanopia')
    } else if(curTheme === 'light') {
      setGiscusTheme('light_tritanopia')
    }
  }, [curTheme])

  return (
    <>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <div className="prose dark:prose-invert m-auto mb-8">
        <div className="pb-8">
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
          <p className="py-10 text-center text-lg opacity-80">
            -- EOF --
          </p>
        </article>
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
          theme={giscusTheme}
          lang="en"
          loading="lazy"
        />
       <SideMenu isPost/>
      </div>
    </>
  )
}

export default Post