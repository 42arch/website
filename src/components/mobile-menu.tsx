'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

function Menu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2">
        <path d="M5 5L19 19">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M5 5L19 19;M5 5L19 5"
          />
        </path>
        <path d="M12 12H12" opacity="0">
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.2s"
            dur="0.4s"
            values="M12 12H12;M5 12H19"
          />
          <set attributeName="opacity" begin="0.2s" to="1" />
        </path>
        <path d="M5 19L19 5">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M5 19L19 5;M5 19L19 19"
          />
        </path>
      </g>
    </svg>
  )
}

function Close() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2">
        <path d="M5 5L19 5">
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.2s"
            dur="0.4s"
            values="M5 5L19 5;M5 5L19 19"
          />
        </path>
        <path d="M5 12H19">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M5 12H19;M12 12H12"
          />
          <set attributeName="opacity" begin="0.4s" to="0" />
        </path>
        <path d="M5 19L19 19">
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.2s"
            dur="0.4s"
            values="M5 19L19 19;M5 19L19 5"
          />
        </path>
      </g>
    </svg>
  )
}

interface Props {
  items: { href: string; title: string }[]
}

export default function MobileMenu({ items }: Props) {
  const [menuShow, setMenuShow] = useState<boolean>(false)

  return (
    <>
      <div
        className="cursor-pointer sm:hidden"
        onClick={() => {
          setMenuShow((v) => !v)
        }}>
        {menuShow ? <Close /> : <Menu />}
      </div>
      <div
        className={clsx(
          'fixed top-[80px] left-0 z-10 h-full w-full bg-light dark:bg-dark opacity-95 duration-300 ease-in-out',
          menuShow ? 'translate-x-0' : 'translate-x-full'
        )}>
        <nav className="fixed mt-8 h-full">
          {items.map((i) => (
            <div key={i.title} className="px-12 py-4">
              <Link
                href={i.href}
                className="text-2xl tracking-widest hover:text-primary hover:opacity-80 duration-300">
                {i.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
