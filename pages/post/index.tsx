import { NextPage } from 'next'
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
      <div>post</div>
    </Layout>
  )
}

export default index
