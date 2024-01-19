'use client'

import { formatDistanceToNow } from 'date-fns'
import { SiTailwindcss, SiNextdotjs, SiVercel } from 'react-icons/si'

export const SiteFooter = () => {
  const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIME as string)
  const buildTimeAgo = formatDistanceToNow(buildTime, { addSuffix: true })

  return (
    <footer className="relative bg-transparent z-10 text-center h-24 px-6 md:px-10 lg:px-16 ">
      <div className="flex flex-col items-center justify-between gap-0 text-sm leading-loose text-zinc-600 dark:text-zinc-400 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 text-center">
          <p className="truncate flex items-center text-sm leading-loose">
            <span>Built with</span> <SiNextdotjs className="mx-2" /> and{' '}
            <SiTailwindcss className="mx-2" />, Deployed on
            <SiVercel className="mx-2" />.
          </p>
        </div>
        <p className="truncate">
          Last build: {buildTimeAgo}{' '}
          <span className="inline-block h-2 w-2 rounded-full bg-green-400 ml-1" />
        </p>
      </div>
    </footer>
  )
}
