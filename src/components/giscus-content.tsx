'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function GiscusContent() {
  const { theme } = useTheme()

  return (
    <div className="mt-12 mb-6 px-6">
      <Giscus
        id="comments"
        repo="42arch/website"
        repoId="R_kgDOHYILzQ"
        category="Announcements"
        categoryId="DIC_kwDOHYILzc4Cmr5S"
        mapping="pathname"
        term="Welcome to Starllow Lab!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark_tritanopia' : 'catppuccin_latte'}
        lang="en"
        loading="lazy"
      />
    </div>

  )
}
