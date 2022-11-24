import { NextPage } from 'next'
import Layout from '@/components/layout'

const index: NextPage<{
  allTagsData: { value: string; count: number }[]
}> = ({}) => {
  return (
    <Layout>
      <div className="m-auto"></div>
    </Layout>
  )
}

export default index
