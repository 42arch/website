'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import {
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import ThemeSelect from './theme-select'
import LocaleSelect from './locale-select'

function Menu() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
      >
        <path d='M5 5L19 19'>
          <animate
            fill='freeze'
            attributeName='d'
            dur='0.4s'
            values='M5 5L19 19;M5 5L19 5'
          />
        </path>
        <path d='M12 12H12' opacity='0'>
          <animate
            fill='freeze'
            attributeName='d'
            begin='0.2s'
            dur='0.4s'
            values='M12 12H12;M5 12H19'
          />
          <set attributeName='opacity' begin='0.2s' to='1' />
        </path>
        <path d='M5 19L19 5'>
          <animate
            fill='freeze'
            attributeName='d'
            dur='0.4s'
            values='M5 19L19 5;M5 19L19 19'
          />
        </path>
      </g>
    </svg>
  )
}

function Close() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
      >
        <path d='M5 5L19 5'>
          <animate
            fill='freeze'
            attributeName='d'
            begin='0.2s'
            dur='0.4s'
            values='M5 5L19 5;M5 5L19 19'
          />
        </path>
        <path d='M5 12H19'>
          <animate
            fill='freeze'
            attributeName='d'
            dur='0.4s'
            values='M5 12H19;M12 12H12'
          />
          <set attributeName='opacity' begin='0.4s' to='0' />
        </path>
        <path d='M5 19L19 19'>
          <animate
            fill='freeze'
            attributeName='d'
            begin='0.2s'
            dur='0.4s'
            values='M5 19L19 19;M5 19L19 5'
          />
        </path>
      </g>
    </svg>
  )
}

interface Props {
  items: { href: string; title: string }[]
}

export default function MobileNav({ items }: Props) {
  const t = useTranslations('nav')
  const [menuShow, setMenuShow] = useState<boolean>(false)

  return (
    <>
      <div
        className='cursor-pointer sm:hidden'
        onClick={() => {
          setMenuShow((v) => !v)
        }}
      >
        {menuShow ? <Close /> : <Menu />}
      </div>
      <div
        className={clsx(
          'fixed left-0 top-[60px] z-10 h-full w-full bg-background opacity-95 duration-700 ease-in-out',
          menuShow ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <NavigationMenuList className='fixed mt-1 flex h-full w-full flex-col justify-start gap-2'>
          {items.map((i) => (
            <Link href={i.href} key={i.title} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'px-8')}
              >
                {t(i.title)}
              </NavigationMenuLink>
            </Link>
          ))}

          <div className='mt-40 flex gap-2'>
            <ThemeSelect />
            <LocaleSelect />
          </div>
        </NavigationMenuList>
      </div>
    </>
  )
}
