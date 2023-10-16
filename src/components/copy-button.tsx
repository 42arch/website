'use client'

import { useState, useEffect } from 'react'
import cn from 'classnames'

function Copy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round">
        <g stroke-width="2">
          <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3H19V11">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="16;0"
            />
          </path>
          <path
            stroke-dasharray="44"
            stroke-dashoffset="44"
            d="M19 17V21H5V3H12">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.4s"
              values="44;0"
            />
          </path>
          <path stroke-dasharray="10" stroke-dashoffset="10" d="M21 14H12.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1s"
              dur="0.2s"
              values="10;0"
            />
          </path>
          <path
            stroke-dasharray="6"
            stroke-dashoffset="6"
            d="M12 14L15 17M12 14L15 11">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.2s"
              dur="0.2s"
              values="6;0"
            />
          </path>
        </g>
        <path
          stroke-dasharray="12"
          stroke-dashoffset="12"
          d="M14.5 3.5V6.5H9.5V3.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="12;0"
          />
        </path>
      </g>
    </svg>
  )
}

function Confirm() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-dasharray="24"
        stroke-dashoffset="24"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 11L11 17L21 7">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="24;0"
        />
      </path>
    </svg>
  )
}

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
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2500)
  }, [hasCopied])

  return (
    <button
      className={cn(
        'z-20 inline-flex h-8 items-center justify-center rounded-md border-zinc-200 p-2 text-sm font-medium transition-all focus:outline-none dark:text-zinc-300 dark:hover:bg-zinc-800 absolute top-4 right-4 border-none text-zinc-700 hover:bg-transparent hover:opacity-100',
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
      {hasCopied ? <Confirm /> : <Copy />}
    </button>
  )
}
