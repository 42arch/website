import { NextPage } from 'next'
import Link from 'next/link'
import dayjs from 'dayjs'
import Layout from '../../components/layout'
import { getSortedPostList, PostData } from '../../helpers/post'

export async function getStaticProps() {
  const allPostsData = getSortedPostList()
  return {
    props: {
      allPostsData
    }
  }
}

const index: NextPage<{ allPostsData: PostData[] }> = ({ allPostsData }) => {
  return (
    <Layout>
      <div className="m-auto py-4 mt-10">
        {allPostsData.map((item, idx) => {
          return (
            <section key={idx} className="pt-6">
              <h1 className="font-bold text-xl py-1 w-fit text-th-text-h hover:opacity-80 transition-all">
                <Link href={`/post/${item.slug}`} className="w-fit">
                  {item.title}
                </Link>
              </h1>
              <div className="text-xs py-1">
                <time dateTime="">{dayjs(item.date).format('YYYY-MM-DD')}</time>
              </div>
              <span className="inline-block my-2 py-1 text-sm">
                {item.excerpt}
              </span>
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export default index
