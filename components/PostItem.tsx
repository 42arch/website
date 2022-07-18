import Link from "next/link"
import { FunctionComponent } from "react"
import { FiFolder, FiCalendar, FiTag } from 'react-icons/fi'
import { PostData } from "../helpers/posts"
import CoverImage from "./CoverImage"
import DateFormater from "./DateFormater"

interface IProps {
  post: PostData
}

export const PostItem: FunctionComponent<IProps> = ({ post }) => {
  return (
    <div key={post.id} className='no-underline py-6 not-prose'>
      <Link href={`/post/${post.id}`}>
        <p className='cursor-pointer text-2xl font-semibold tracking-wide text-center py-4 leading-tight no-underline hover:opacity-80'>{ post.title }</p>
      </Link>
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
      {
        post.coverImage && (
          <CoverImage src={ post.coverImage } slug={ post.id } width={1240} height={620} title={ post.title }></CoverImage>
        )
      }
      <p className="opacity-80 dark:opacity-70 py-2 text-sm">
        { post.excerpt }
      </p>
    </div>
  )
}
