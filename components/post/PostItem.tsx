import Link from "next/link"
import { FunctionComponent } from "react"
import { PostData } from "../../helpers/posts"
import CoverImage from "./CoverImage"
import Metadata from "./Metadata"

interface IProps {
  post: PostData
}

export const PostItem: FunctionComponent<IProps> = ({ post }) => {
  return (
    <div key={post.id} className='no-underline py-6 not-prose'>
      <Link href={`/post/${post.id}`}>
        <p className='cursor-pointer text-2xl font-semibold tracking-wide text-center py-4 leading-tight no-underline hover:opacity-80'>{ post.title }</p>
      </Link>
      <Metadata post={ post }/>
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
