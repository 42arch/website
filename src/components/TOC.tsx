'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import { TableOfContents } from '@/lib/toc'
import { useMounted } from '@/hooks/useMounted'
import cn from 'classnames'

const useActiveItem = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `0% 0% -80% 0%`
      }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem: string | null
}

const Tree: FC<TreeProps> = ({ tree, level = 1, activeItem }) => {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn('mt-0 pt-2')}>
            <a
              href={item.url}
              className={cn(
                'inline-block no-underline',
                item.url === `#${activeItem}`
                  ? 'text-state-900 font-medium'
                  : 'text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-500'
              )}>
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}

interface TocProps {
  toc: TableOfContents
}

const TableOfContent: FC<TocProps> = ({ toc }) => {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => (id ? id.split('#')[1] : ''))
        : [],
    [toc]
  )

  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items) {
    return null
  }
  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null
}

export default TableOfContent
