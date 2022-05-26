import { FunctionComponent, ReactNode } from "react"

interface IProps {
  children: string | ReactNode
}

const MDXWrapper: FunctionComponent<IProps> = ({ children }) => {
  return (
    <div className={`prose dark:prose-invert m-auto`}>
      {
        children
      }
    </div>
  )
}

export default MDXWrapper