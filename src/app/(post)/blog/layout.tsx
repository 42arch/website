import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const BlogLayout: FC<IProps> = ({ children }) => {
  return <div className="mx-auto max-w-5xl">{children}</div>
}

export default BlogLayout
