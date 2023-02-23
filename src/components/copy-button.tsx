'use client'

import * as React from 'react'
import cn from 'classnames'
import { FiCheck, FiCopy } from 'react-icons/fi'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

async function copyToClipboardWithMeta(
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _meta?: Record<string, unknown>
) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  src,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className={cn(
        'z-20 inline-flex h-8 items-center justify-center rounded-md border-slate-200 p-2 text-sm font-medium transition-all focus:outline-none dark:text-slate-100 dark:hover:bg-slate-800 absolute top-4 right-4 border-none text-slate-300 opacity-50 hover:bg-transparent hover:opacity-100',
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(value, {
          component: src
        })
        setHasCopied(true)
      }}
      {...props}>
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <FiCheck className="h-4 w-4" />
      ) : (
        <FiCopy className="h-4 w-4" />
      )}
    </button>
  )
}
