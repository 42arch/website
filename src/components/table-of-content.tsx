'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import { TableOfContents } from '@/lib/toc'
import { useMounted } from '@/hooks/useMounted'
import clsx from 'clsx'

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
    <ul className={clsx('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={clsx('mt-0 pt-2')}>
            <a
              href={item.url}
              className={clsx(
                level === 1 && 'text-base',
                level === 2 && 'text-sm opacity-80 mr-1',
                'inline-block no-underline duration-300',
                item.url === `#${activeItem}`
                  ? 'text-primary text-base'
                  : 'text-zinc-700 dark:text-zinc-300 hover:opacity-80'
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

export default function TableOfContent({ toc }: TocProps) {
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
    <div className="space-y-2 text-right">
      <p className="font-semibold">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null
}
