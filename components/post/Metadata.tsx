import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { FiCalendar, FiFolder, FiTag } from 'react-icons/fi'
import { PostData } from '../../helpers/posts'
import DateFormater from '../DateFormater'

interface IProps {
  post: PostData
}

const Metadata: FunctionComponent<IProps> = ({ post }) => {
  return (
    <small className="flex py-2 not-prose">
      <p className="flex items-center">
        <FiCalendar className='w-4 h-4 mr-2'/>
        <DateFormater datetime={ post.date } />
      </p>
      <p className="cursor-pointer ml-6 flex justify-center items-center hover:opacity-80">
        {
          post.category && <>
            <FiFolder className='w-4 h-4 mr-2'/>
            { post.category }
          </>
        }

      </p>
      <p className="flex items-center ml-6 hover:opacity-80">
        {
          post.tags && <>
            <FiTag className='w-4 h-4 mr-2'/>
            {
              post.tags.map((tag, idx) => (
                <Link key={tag} href={`/post/tag/${tag}`}>
                  <span className="cursor-pointer mr-4" >{ tag }</span>
                </Link>
              ))
            }
          </>
        }

      </p>
    </small>
  )
}

export default Metadata