import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found'
}

export default function NotFound() {
  return (
    <div className='relative flex flex-col items-center gap-2 px-4 pt-12 lg:gap-8'>
      <h1 className='text-accent-blue text-h1 dark:text-blue-400'>
        Page Not Found
      </h1>
    </div>
  )
}
