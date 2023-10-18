'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

const projects = [
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    intro: 'Preview, create and edit geojson data in VSCode',
    star: 6,
    open: true,
    tag: ['vscode', 'leaflet'],
    color: ''
  },
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    star: 6,
    open: true,
    tag: [],
    color: ''
  },
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    star: 6,
    open: true,
    tag: [],
    color: ''
  },
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    star: 6,
    open: false,
    tag: [],
    color: ''
  },
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    star: 1,
    open: false,
    tag: [],
    color: ''
  },
  {
    name: 'geojson.io',
    repo: 'https://github.com/42arch',
    star: 1,
    open: false,
    tag: [],
    color: ''
  }
]

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <>
      <motion.svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        className="translate-y-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: (i) => {
            const delay = 0 + i * 0.5
            return {
              pathLength: 1,
              opacity: 0.6,
              transition: {
                opacity: { delay, duration: 0.3 }
              }
            }
          }
        }}>
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          className="stroke-zinc-300 dark:stroke-zinc-700"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          className="stroke-zinc-400 dark:stroke-zinc-600"
          style={{ pathLength: scrollXProgress }}
        />
      </motion.svg>

      <motion.div
        ref={containerRef}
        className="flex mx-auto h-[380px] md:h-[420px] gap-6 md:gap-8 overflow-x-scroll overflow-y-hidden
          scrollbar scrollbar-rounded scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
        initial="hidden"
        animate="show">
        {projects.map((i, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 1200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: 'easeOut',
              duration: idx * 0.5 + 1
            }}
            className={clsx(
              'grow-0 shrink-0 basis-[260px] md:basis-[320px] mb-4 rounded-lg flex flex-col bg-zinc-200 dark:bg-zinc-800',
              i.open ? '' : 'items-center justify-center p-2'
            )}>
            {i.open ? (
              <>
                <Image
                  className="rounded-t-lg"
                  width={320}
                  height={80}
                  src="/images/project-cover.jpg"
                  alt={i.name}
                />
                <div className="p-2 md:p-4">
                  <h3 className="text-lg md:text-xl mb-2">{i.name}</h3>
                  <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                    {i.intro}
                  </p>
                </div>
              </>
            ) : (
              <h3 className="text-lg text-zinc-700 dark:text-zinc-300">
                Comming Soon...
              </h3>
            )}
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
