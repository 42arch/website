import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
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
  console.log(9999, allPostsData)
  return (
    <Layout>
      <div className="prose m-auto py-4">
        {allPostsData.map((item, idx) => {
          return (
            <Link key={idx} href={`/post/${item.slug}`}>
              <h1>{item.title}</h1>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default index
