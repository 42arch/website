'use client'

import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

const GiscusComment = () => {
  const [giscusTheme, setGiscusTheme] = useState<string>('')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setGiscusTheme('dark_protanopia')
    } else if (resolvedTheme === 'light') {
      setGiscusTheme('light_tritanopia')
    }
  }, [resolvedTheme])

  return (
    <Giscus
      id="comments"
      repo="42arch/giscus-content"
      repoId="R_kgDOHtv2FQ"
      category="Announcements"
      categoryId="DIC_kwDOHtv2Fc4CQbKi"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  )
}
export default GiscusComment
