import { NextPage } from 'next'
import Link from 'next/link'
import { allPosts, Post } from '@/contentlayer/generated'
import Layout from '@/layout'
import DateTime from '@/components/DateTime'
import dayjs from 'dayjs'

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return dayjs(b.date).diff(a.date)
  })
  return {
    props: {
      posts
    }
  }
}

const index: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout>
      <div className="m-auto py-4 mt-10">
        {posts.map((post, idx) => {
          return (
            <section key={idx} className="pt-6 pb-2">
              <h1 className="font-bold text-xl py-1 w-fit text-th-text-h hover:opacity-80 transition-all">
                <Link href={`/post/${post.url}`} className="w-fit">
                  {post.title}
                </Link>
              </h1>
              <div className="text-xs py-1 flex">
                <DateTime datetime={post.date} />
              </div>
              <span className="inline-block my-2 py-1 text-sm">
                {post.excerpt}
              </span>

              <div className="text-xs py-1">
                {post.tags?.map((tag, i) => {
                  return (
                    <span
                      key={i}
                      className="mr-4 hover:opacity-80 cursor-pointer">
                      # {tag}
                    </span>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export default index
