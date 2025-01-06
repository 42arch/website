import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'
import 'katex/dist/katex.min.css'

type Props = {
  className: string
}

export default function Article({
  children,
  className
}: PropsWithChildren<Props>) {
  return (
    <article
      className={cn(
        className,
        'prose prose-neutral max-w-fit dark:prose-invert'
      )}
    >
      {children}
    </article>
  )
}
