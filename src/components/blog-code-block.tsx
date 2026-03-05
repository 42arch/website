'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PixelIcon } from '@/components/pixel-icon'
import { cn } from '@/lib/utils'

interface BlogCodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
  copyLabel: string
  copiedLabel: string
}

const RESET_DELAY_MS = 1600

export function BlogCodeBlock({
  className,
  children,
  copyLabel,
  copiedLabel,
  ...props
}: BlogCodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return () => {
      if (copiedTimer.current)
        clearTimeout(copiedTimer.current)
    }
  }, [])

  const handleCopy = useCallback(async () => {
    const preElement = preRef.current
    if (!preElement)
      return

    const codeElement = preElement.querySelector('code')
    const textContent = (codeElement?.textContent ?? preElement.textContent ?? '').replace(/\n$/, '')
    if (!textContent)
      return

    try {
      await navigator.clipboard.writeText(textContent)
      setCopied(true)

      if (copiedTimer.current)
        clearTimeout(copiedTimer.current)

      copiedTimer.current = setTimeout(() => {
        setCopied(false)
      }, RESET_DELAY_MS)
    }
    catch {
      setCopied(false)
    }
  }, [])

  const accessibleLabel = copied ? copiedLabel : copyLabel

  return (
    <div className="blog-code-block">
      <button
        type="button"
        className="blog-code-copy-button"
        data-copied={copied}
        onClick={handleCopy}
        aria-label={accessibleLabel}
        title={accessibleLabel}
      >
        <PixelIcon name="copy" size={12} />
      </button>
      <pre ref={preRef} className={cn(className)} {...props}>
        {children}
      </pre>
    </div>
  )
}
