import React, { FC } from 'react'

interface PageProps {
  children: React.ReactNode
}

export async function generateMetadata() {
  return {
    title: '42arch | blog',
    description: "42Arch, Dan's personal site. The blog post collection."
  }
}

const BlogLayout: FC<PageProps> = ({ children }) => {
  return <>{children}</>
}

export default BlogLayout
