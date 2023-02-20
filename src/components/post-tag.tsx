import Link from 'next/link'
import React, { FC } from 'react'

interface PostTagProps {
  text: string
}

const PostTag: FC<PostTagProps> = ({ text }) => {
  return (
    <Link
      href={'/'}
      className='mr-3 mt-2 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"'>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default PostTag
