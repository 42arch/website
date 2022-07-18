import Link from "next/link"
import { FunctionComponent } from "react"
import { FiFolder } from 'react-icons/fi'
import { PostData } from "../helpers/posts"
import CoverImage from "./CoverImage"
import DateFormater from "./DateFormater"

interface IProps {
  post: PostData
}

export const PostItem: FunctionComponent<IProps> = ({ post }) => {
  return (
    <div key={post.id} className='no-underline py-6 mb-1 not-prose'>
      <Link href={`/post/${post.id}`}>
        <p className='cursor-pointer text-2xl py-2 leading-tight no-underline hover:opacity-80'>{ post.title }</p>
      </Link>
      <small className="flex py-2">
        <DateFormater dateString={ post.date } />
        <p className="cursor-pointer ml-6 flex justify-center items-center hover:opacity-80">
          <FiFolder className='w-4 h-4 mx-2'/>
          { post.category }
        </p>
      </small>
      {
        post.coverImage && (
          <CoverImage src={ post.coverImage } slug={ post.id } width={1240} height={620} title={ post.title }></CoverImage>
        )
      }
      <p className="opacity-80 text-sm">
        { post.excerpt }
      </p>
    </div>
  )
}
