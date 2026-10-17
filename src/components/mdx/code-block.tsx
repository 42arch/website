'use client'

import type { ComponentProps, ReactNode } from 'react'
import { isValidElement } from 'react'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/components/ui/code-block'

type MdxCodeBlockProps = ComponentProps<'pre'>

function getCodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number')
    return String(node)

  if (Array.isArray(node))
    return node.map(getCodeText).join('')

  if (!isValidElement<{ children?: ReactNode, className?: string }>(node))
    return ''

  if (node.props.className?.split(/\s+/).some(name => name.startsWith('twoslash-popup')))
    return ''

  return getCodeText(node.props.children)
}

export function MdxCodeBlock({ children, className, ...preProps }: MdxCodeBlockProps) {
  const codeElement = Array.isArray(children)
    ? children.find(child => isValidElement<{ className?: string, children?: ReactNode }>(child) && child.type === 'code')
    : isValidElement<{ className?: string, children?: ReactNode }>(children) && children.type === 'code'
      ? children
      : undefined
  const codeProps = codeElement && isValidElement<{ className?: string, children?: ReactNode }>(codeElement)
    ? codeElement.props
    : undefined
  const language = codeProps?.className
    ?.split(/\s+/)
    .find(name => name.startsWith('language-'))
    ?.replace('language-', '')
    .toUpperCase() ?? 'CODE'

  return (
    <CodeBlock className="mdx-code-block my-5 border-ph-border bg-ph-surface/80">
      <CodeBlockHeader className="min-h-10 border-b border-ph-border/70 px-4 pb-2 pt-3">
        <CodeBlockTitle className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ph-muted">
          {language}
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton
            value={getCodeText(codeProps?.children ?? children)}
            aria-label="复制代码"
            title="复制代码"
            className="text-ph-muted hover:text-ph-ink"
          />
        </CodeBlockActions>
      </CodeBlockHeader>
      <pre {...preProps} className={className}>{children}</pre>
    </CodeBlock>
  )
}
