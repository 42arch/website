import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  title: string
  src: string
  slug?: string
  height: number
  width: number
}

const CoverImage: FunctionComponent<IProps> = ( {title, src, slug, height, width}) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  )

  return (
    <div className="sm:mx-0 py-2">
      {slug ? (
        <Link href={`/post/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
