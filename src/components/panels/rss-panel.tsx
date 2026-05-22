'use client'

import { CheckIcon, CopyIcon, LinkIcon, RssIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { siteConfig } from '@/config'

export function RssPanel({
  rawXml,
  highlightedHtml,
}: {
  rawXml: string
  highlightedHtml: string
}) {
  const { site } = siteConfig
  const feedUrl = `${site.url}/rss.xml`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(rawXml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-[var(--shiki-background)] text-[var(--shiki-foreground)] font-mono text-xs select-text"
    >
      {/* File Editor Header */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-os-border/40 bg-os-toolbar px-4">
        <div className="flex items-center gap-2">
          <RssIcon size={14} className="text-os-accent" />
          <span className="text-[11px] font-semibold text-foreground">rss.xml</span>
          <span className="text-[9px] text-muted-foreground">Preview</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Subscribe Link Button */}
          <a
            href={feedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-sm border border-os-border bg-os-surface px-2.5 py-1 text-[10px] text-foreground hover:bg-os-accent/10 transition-colors"
          >
            <LinkIcon size={11} />
            Subscribe
          </a>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-sm bg-os-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground hover:bg-os-primary-hover transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon size={11} />
                COPIED
              </>
            ) : (
              <>
                <CopyIcon size={11} />
                COPY
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-auto p-4 os-scrollbar">
        <div
          className="shiki-wrapper [&_pre]:bg-transparent! [&_pre]:p-0 [&_code]:block [&_code]:w-full text-[11px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>
    </motion.div>
  )
}
