'use client'

import type { ReactNode } from 'react'
import { ArrowLeftIcon, ArrowUpIcon, CalendarIcon, ClockIcon, FolderIcon, ListBulletsIcon, TagIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const SLUG_CLEAN_REGEX = /[^a-z0-9]+/g
const SLUG_TRIM_REGEX = /(^-|-$)+/g

interface WritingDetailPanelProps {
  title: string
  date: Date
  tags: string[]
  category?: string
  readingTime?: string
  description?: string
  toc?: { title: ReactNode, url: string, depth: number }[]
  children: ReactNode
}

export function WritingDetailPanel({ title, date, tags, category, readingTime, description, toc, children }: WritingDetailPanelProps) {
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [dynamicToc, setDynamicToc] = useState<{ title: ReactNode, url: string, depth: number }[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 动态扫描 DOM 并物理对齐 ID 链路 (增加 100ms 延迟以完全避开 React 异步子树时差，并在卸载时清理)
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector('.prose')
      if (!container)
        return

      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4'))

      if (toc && toc.length > 0) {
        // 强力物理绑定：将服务端 TOC ID 按照顺序写回 DOM 元素
        toc.forEach((item, idx) => {
          const heading = headings[idx]
          if (heading) {
            const id = item.url.startsWith('#') ? item.url.slice(1) : item.url
            heading.id = id
          }
        })
        setDynamicToc(toc)
      }
      else {
        // 兜底客户端扫描
        const parsed: { title: string, url: string, depth: number }[] = []
        headings.forEach((heading, idx) => {
          let id = heading.id
          if (!id) {
            const text = heading.textContent || ''
            id = text
              .toLowerCase()
              .replace(SLUG_CLEAN_REGEX, '-')
              .replace(SLUG_TRIM_REGEX, '') || `heading-${idx}`
            heading.id = id
          }
          parsed.push({
            title: heading.textContent || '',
            url: `#${id}`,
            depth: heading.tagName.toLowerCase() === 'h2' ? 2 : heading.tagName.toLowerCase() === 'h3' ? 3 : 4,
          })
        })
        setDynamicToc(parsed)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [toc, children])

  // 监听滚动，自动高亮当前可视区域的目录项 (基于安全的 scrollContainerRef)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container)
      return

    const handleScroll = () => {
      const headingElements = dynamicToc.map((item) => {
        const id = item.url.startsWith('#') ? item.url.slice(1) : item.url
        return document.getElementById(id)
      }).filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0)
        return

      let currentId = ''
      const containerRect = container.getBoundingClientRect()

      for (const heading of headingElements) {
        const rect = heading.getBoundingClientRect()
        if (rect.top - containerRect.top <= 120) {
          currentId = heading.id
        }
        else {
          break
        }
      }

      if (currentId) {
        setActiveId(currentId)
      }
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [dynamicToc])

  // 平滑滚动定位 (物理序号直连 + 异步 DOM 动态补全双重对齐保障)
  const scrollToAnchor = useCallback((url: string, index: number) => {
    const id = url.startsWith('#') ? url.slice(1) : url
    const container = scrollContainerRef.current
    if (!container)
      return

    // 1. 优先通过 ID 查找
    let element = document.getElementById(id)

    // 2. 100% 绝对兜底：在点击交互的瞬间直接拉出 DOM 树中物理对应的第 index 个标题
    const prose = container.querySelector('.prose')
    if (prose) {
      const headings = Array.from(prose.querySelectorAll('h1, h2, h3, h4'))

      if (!element) {
        element = headings[index] as HTMLElement
      }

      // 顺便自我修复，补齐 DOM 标题的 ID，让之后的 Scroll Spy 主动高亮无缝衔接
      headings.forEach((heading, idx) => {
        if (heading && idx === index) {
          heading.id = id
        }
      })
    }

    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top - containerRect.top + container.scrollTop

      container.scrollTo({
        top: absoluteElementTop - 24,
        behavior: 'smooth',
      })

      // 闪烁高亮强反馈
      element.classList.add('animate-pulse', 'text-os-accent')
      setTimeout(() => {
        element.classList.remove('animate-pulse', 'text-os-accent')
      }, 1500)

      setActiveId(id)

      if (window.innerWidth < 768) {
        setIsTocOpen(false)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative h-full w-full"
    >
      <div className="absolute top-6 right-6 z-40 flex flex-col gap-2">
        {dynamicToc.length > 0 && (
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[11px] border transition-all duration-200 ${
              isTocOpen
                ? 'bg-os-accent/10 border-os-accent text-os-accent shadow-[0_0_8px_rgba(var(--accent),0.15)]'
                : 'bg-os-surface/80 backdrop-blur-sm border-os-border text-muted-foreground hover:text-foreground hover:border-os-border-strong'
            }`}
          >
            <ListBulletsIcon size={13} />
            TOC
          </button>
        )}

        <button
          onClick={() => {
            const container = scrollContainerRef.current
            if (container) {
              container.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[11px] border bg-os-surface/80 backdrop-blur-sm border-os-border text-muted-foreground hover:text-foreground hover:border-os-border-strong transition-all duration-200"
        >
          <ArrowUpIcon size={13} />
          TOP
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="os-scrollbar h-full overflow-y-auto p-6"
      >
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/writing" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-os-accent transition-colors">
                <ArrowLeftIcon size={12} />
                cd ../
              </Link>
            </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <CalendarIcon size={12} />
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              {category && (
                <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                  <FolderIcon size={12} />
                  {category}
                </span>
              )}
              {readingTime && (
                <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <ClockIcon size={12} />
                  {readingTime}
                </span>
              )}
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground bg-os-surface border border-os-border px-2 py-0.5 rounded-sm">
                  <TagIcon size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-os-border" />

        {/* Content */}
        <div className="prose text-sm md:prose-base max-w-none text-muted-foreground font-sans
          prose-headings:text-foreground prose-headings:font-heading prose-headings:font-bold prose-headings:scroll-mt-10
          prose-strong:text-foreground
          prose-a:text-os-accent prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-os-accent prose-blockquote:bg-os-accent-muted/5 prose-blockquote:py-1 prose-blockquote:text-foreground/80
          prose-code:font-mono prose-code:text-os-accent prose-code:bg-os-accent-muted/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:font-mono prose-pre:bg-[var(--shiki-background)] prose-pre:text-[var(--shiki-foreground)] prose-pre:border prose-pre:border-os-border prose-pre:rounded-sm
          prose-ol:marker:text-os-accent prose-ul:marker:text-os-accent
          prose-hr:border-os-border"
        >
          {children}
        </div>
      </div>
    </div>

      {/* Futuristic Glassmorphic TOC Panel */}
      <AnimatePresence>
        {isTocOpen && dynamicToc.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-24 right-6 z-50 w-72 max-h-[calc(100vh-10rem)] overflow-y-auto bg-os-surface/85 backdrop-blur-md border border-os-border shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-md p-4 os-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-os-border pb-2.5 mb-3">
              <span className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                <ListBulletsIcon size={14} className="text-os-accent" />
                Index
              </span>
              <button
                onClick={() => setIsTocOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm hover:bg-os-border/20"
              >
                <XIcon size={14} />
              </button>
            </div>

            <div className="space-y-1.5 font-mono text-[11px]">
              {dynamicToc.map((item, idx) => {
                const id = item.url.startsWith('#') ? item.url.slice(1) : item.url
                const isActive = activeId === id

                return (
                  <button
                    key={idx}
                    onClick={() => scrollToAnchor(item.url, idx)}
                    className={`w-full text-left py-1 px-2 rounded-sm transition-all duration-150 flex items-start gap-2 hover:bg-os-border/20 ${
                      isActive
                        ? 'text-os-accent bg-os-accent-muted/10 font-medium translate-x-0.5'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    style={{
                      paddingLeft: `${(item.depth - 2) * 12 + 8}px`,
                    }}
                  >
                    <span className={`inline-block w-1 h-1 rounded-full mt-1.5 transition-transform duration-200 ${
                      isActive ? 'bg-os-accent scale-150' : 'bg-muted-foreground/30'
                    }`}
                    />
                    <span className="flex-1 truncate">{item.title}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
