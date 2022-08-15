import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostTags } from '../../../helpers/posts'
import { Tag } from '../../../helpers/types'

export async function getStaticProps({params}: any) {
  const tags = await getAllPostTags()
  return {
    props: {
      tags
    }
  }
}

const Tag: NextPage<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
      <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>Tags</h1>
      </div>
      <div className='flex max-w-lg flex-wrap'>
        {
          tags.map((tag, idx) => (
            <Link href={`/post/tag/${tag.label}`} key={idx}>
              <div className='mt-2 mb-2 mr-5 cursor-pointer'>
                <a className='mr-3 text-sm uppercase font-bold text-primary hover:opacity-90 dark:hover:opacity-80'>{tag.label}</a>
                <a className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'>({ tag.total })</a>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Tag