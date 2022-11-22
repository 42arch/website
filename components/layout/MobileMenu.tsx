import React, { FC, useState, useRef } from 'react'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from 'react-use'
import { FiMenu, FiX } from 'react-icons/fi'
import cn from 'classnames'
import s from './Header.module.css'
import { useRouter } from 'next/router'

const NavItem: FC<{ href: string; text: string }> = ({ href, text }) => {
  const router = useRouter()
  const isAcitve = router.asPath === href

  return (
    <li
      className={cn(
        s.hover_bottom,
        isAcitve ? 'text-th-text-h font-bold' : 'text-th-text',
        'cursor-pointer mx-auto my-3 p-1 rounded text-center'
      )}>
      <NextLink href={href}>{text}</NextLink>
    </li>
  )
}

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setIsMenuOpen(false)
  })

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }

  return (
    <>
      <button
        className={'visible md:hidden hover:opacity-80'}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}>
        <FiMenu />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ ease: 'linear', duration: 0.3 }}
            ref={ref}
            className="absolute z-50 w-full left-0 top-0 py-2">
            <div className="py-2 md:py-4 px-4 shadow-2xl rounded-lg backdrop-blur-3xl ">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">MAINISSUES.CC</span>
                <FiX
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => {
                    setIsMenuOpen(false)
                  }}
                />
              </div>
              <ul className="pt-4 flex flex-col justify-center">
                <NavItem href="/" text="Home" />
                <NavItem href="/project" text="Project" />
                <NavItem href="/post" text="Post" />
                <NavItem href="/about" text="About" />
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu
