'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="translate-y-4">
        <circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          opacity={0.1}
          className="stroke-zinc-700 dark:stroke-zinc-50"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          className="stroke-zinc-700 dark:stroke-zinc-50"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>

      <div
        ref={containerRef}
        className="flex mx-auto h-[300px] basis-[600px] gap-6 overflow-x-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="grow-0 shrink-0 basis-[200px] flex items-center justify-center h-64 w-48 border-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-700 dark:border-zinc-200 border-opacity-10 rounded ">
            {i}
          </div>
        ))}
      </div>
    </>
  )
}
