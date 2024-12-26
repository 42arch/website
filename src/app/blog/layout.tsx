import { PropsWithChildren } from 'react'

export default async function BlogLayout({ children }: PropsWithChildren) {
  return <div className='p-4'>{children}</div>
}
