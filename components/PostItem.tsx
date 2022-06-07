import Link from "next/link"
import { FunctionComponent } from "react"
import { PostData } from "../helpers/posts"
import CoverImage from "./CoverImage"
import DateFormater from "./DateFormater"

interface IProps {
  post: PostData
}

export const PostItem: FunctionComponent<IProps> = ({ post }) => {
  return (
    <div key={post.id} className='no-underline py-4'>
      <Link href={`/post/${post.id}`}>
        <p className='cursor-pointer text-2xl my-2 leading-tight no-underline hover:opacity-80'>{ post.title }</p>
      </Link>
      <small>
        <DateFormater dateString={ post.date } />
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
