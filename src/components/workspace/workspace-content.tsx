'use client'

import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'

export function WorkspaceContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <main
      id="workspace-content"
      className="flex flex-1 flex-col overflow-hidden bg-os-panel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
