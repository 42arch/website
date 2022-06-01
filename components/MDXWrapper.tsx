import Head from "next/head"
import React, { FunctionComponent, ReactNode } from "react"

interface IProps {
  children: string | ReactNode
  title: string
}

const MDXWrapper: FunctionComponent<IProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{ title ? title : "dan's site" }</title>
      </Head>
      <div className={`prose dark:prose-invert m-auto`}>
        {
          children
        }
      </div>
    </>
  )
}

export default MDXWrapper