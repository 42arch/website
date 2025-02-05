'use client'

import Giscus from '@giscus/react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'

export default function GiscusContent() {
  const locale = useLocale()
  const { theme } = useTheme()

  return (
    <Giscus
      id='comments'
      repo='42arch/website'
      repoId='R_kgDOHYILzQ'
      category='Announcements'
      categoryId='DIC_kwDOHYILzc4Cmr5S'
      mapping='pathname'
      term='Welcome to @giscus/react component!'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={theme === 'dark' ? 'noborder_dark' : 'light_protanopia'}
      lang={locale}
      loading='lazy'
    />
  )
}
