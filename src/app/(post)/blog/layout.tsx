import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const BlogLayout: FC<IProps> = ({ children }) => {
  return <>{children}</>
}

export default BlogLayout
