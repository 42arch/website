import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = {
  className: string
}

export default function Article({
  children,
  className
}: PropsWithChildren<Props>) {
  return (
    <article className={cn(className, 'prose prose-neutral dark:prose-invert')}>
      {children}
    </article>
  )
}
