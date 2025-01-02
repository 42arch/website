'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyButton({
  text,
  className
}: {
  text: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className={className}
      aria-label='Copy to clipboard'
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}
