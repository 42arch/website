'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'

const projects = [
  {
    name: 'geojson.io for vscode',
    site: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    repo: 'https://github.com/42arch/geojson.io-for-vscode',
    intro: 'Preview, create and edit geojson data in VSCode.',
    star: 6,
    open: true,
    tag: ['vscode', 'leaflet', 'react'],
    color: ''
  },
  {
    name: 'personal website',
    site: 'https://mainissues.cc',
    repo: 'https://github.com/42arch/website',
    intro: 'My personal portfolio and blog website.',
    star: 6,
    open: true,
    tag: ['next.js', 'tailwindcss', 'framer motion'],
    color: ''
  },
  {
    name: 'sketchbook',
    intro: 'A collection of web graphic demos.',
    site: 'https://github.com/42arch/sketchbook',
    repo: 'https://github.com/42arch/sketchbook',
    star: 6,
    open: true,
    tag: ['d3.js', 'p5.js', 'three.js'],
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
  const isInView = useInView(containerRef, { once: true })
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const { scrollXProgress } = useScroll({ container: galleryRef })

  return (
    <motion.section className="w-full" ref={containerRef}>
      <motion.svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        className="translate-y-12"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.7,
            transition: {
              opacity: { delay: 0.3, duration: 1.5 }
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
        ref={galleryRef}
        className="flex mx-auto h-[380px] md:h-[440px] gap-6 md:gap-8 overflow-x-scroll overflow-y-hidden
          scrollbar scrollbar-rounded scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        {projects.map((i, idx) => (
          <motion.div
            key={idx}
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { y: 1200, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  ease: 'easeOut',
                  duration: idx * 0.5 + 1
                }
              }
            }}
            className={clsx(
              'grow-0 shrink-0 basis-[260px] md:basis-[320px] mb-4 rounded-lg flex flex-col justify-evenly bg-zinc-200 dark:bg-zinc-800',
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
                <div className="p-2 border-b dark:border-zinc-700 border-zinc-300 border-opacity-80">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {i.name}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                    {i.intro}
                  </p>
                </div>
                <div className="p-2 flex flex-wrap gap-2">
                  {i.tag.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-zinc-700 dark:bg-zinc-300 text-zinc-300 dark:text-zinc-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="p-2 flex justify-between">
                  <Link
                    href={i.site!}
                    target="__blank"
                    className="text-sm py-[2px] px-2 rounded-lg border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-zinc-800 duration-300">
                    visit
                  </Link>

                  <Link href={i.repo} target="__blank">
                    <SiGithub
                      className="text-lg cursor-pointer"
                      height={36}
                      width={36}
                    />
                  </Link>
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
    </motion.section>
  )
}
