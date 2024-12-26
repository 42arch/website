import Image from 'next/image'

interface Props {
  src?: string
  alt?: string
  fill?: boolean
  width?: number | string
  height?: number | string
  blurDataURL?: string
}

export default function MarkdownImage({
  src,
  alt,
  fill,
  width,
  height,
  blurDataURL
}: Props) {
  if (!src || !alt) {
    throw new Error('src and alt is required')
  }
  return (
    <Image
      blurDataURL={blurDataURL}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      src={src}
      alt={alt}
      fill={fill}
      width={Number(width)}
      height={Number(height)}
      className='rounded-md shadow-md'
    />
  )
}
