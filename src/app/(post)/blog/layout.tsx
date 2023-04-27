import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const BlogLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      {children}
    </>
  )
}

export default BlogLayout
