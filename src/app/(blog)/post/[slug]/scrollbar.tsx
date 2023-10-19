'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 w-screen z-50 h-1 origin-left bg-zinc-900 dark:bg-zinc-300 opacity-80"
      style={{ scaleX: scrollYProgress }}></motion.div>
  )
}
