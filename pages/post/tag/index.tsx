import { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { getAllPostTags } from '../../../helpers/posts'

export async function getStaticProps({params}: any) {
  const tags = await getAllPostTags()
  return {
    props: {
      tags
    }
  }
}

const Tag: NextPage<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className='prose dark:prose-invert m-auto flex flex-wrap justify-evenly'>
      {
        tags.map(tag => (
          <a className="mx-4 font-mono hover:opacity-90" key={tag}>{ `# ${tag}` }</a>
        ))
      }
    </div>
  )
}

export default Tag