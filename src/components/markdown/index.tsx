import { highlight, Pre, RawCode } from 'codehike/code'
import { MDXContent } from '@content-collections/mdx/react'
import MarkdownImage from './image'
import { CopyButton } from './copy-button'

interface Props {
  code: string
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, 'material-palenight')

  return (
    <div className='relative overflow-hidden rounded border'>
      {highlighted.meta ? (
        <div className='flex justify-between bg-neutral-700 px-2 py-1 text-neutral-100 dark:bg-neutral-900'>
          <span className='text-sm'>{highlighted.meta}</span>

          <CopyButton text={highlighted.code} />
        </div>
      ) : (
        <CopyButton
          className='absolute right-2 top-2 text-neutral-100'
          text={highlighted.code}
        />
      )}

      <Pre className='my-0 rounded-none' code={highlighted} />
    </div>
  )
}
export default function Markdown({ code }: Props) {
  return (
    <MDXContent
      code={code}
      components={{
        Code,
        img: MarkdownImage
      }}
    />
  )
}
