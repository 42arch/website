import { useMemo } from 'react'

interface Props {
  content: string | null
}
const regex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp)/gi

export default function ShuoContent({ content }: Props) {
  const { text, images } = useMemo(() => {
    let text = content

    const images = content?.match(regex)

    if (images?.length && text) {
      text = text?.replace(new RegExp(images.join('|'), 'g'), '')
    }

    return {
      text,
      images: images
    }
  }, [content])

  return (
    <div className='py-2'>
      <p className='mb-2'>{text}</p>
      {images?.map((image, idx) => (
        <img key={idx} src={image} className='max-h-[260px]' />
      ))}
    </div>
  )
}
