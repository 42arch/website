'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

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
        strokeLinecap="round"
        strokeLinejoin="round">
        <g strokeWidth="2">
          <path strokeDasharray="16" strokeDashoffset="16" d="M12 3H19V11">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="16;0"
            />
          </path>
          <path strokeDasharray="44" strokeDashoffset="44" d="M19 17V21H5V3H12">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.4s"
              values="44;0"
            />
          </path>
          <path strokeDasharray="10" strokeDashoffset="10" d="M21 14H12.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1s"
              dur="0.2s"
              values="10;0"
            />
          </path>
          <path
            strokeDasharray="6"
            strokeDashoffset="6"
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
          strokeDasharray="12"
          strokeDashoffset="12"
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
        strokeDasharray="24"
        strokeDashoffset="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
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
      className={clsx(
        'z-20 inline-flex h-8 items-center justify-center rounded-md border-zinc-200 p-2 text-sm font-medium transition-all focus:outline-none text-zinc-300 hover:bg-zinc-800 absolute top-14 right-4 border-none hover:bg-transparent hover:opacity-100',
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
