import React, { FC, ReactNode } from 'react'

interface Props {
  href: string
  label: string
  icon: ReactNode
  // children: ReactNode
}

const LinkButton: FC<Props> = ({ href, label, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex flex-row items-center px-2 text-sm py-1 mt-2 mr-2 rounded-md bg-slate-100 transition-colors decoration-none hover:bg-slate-700 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white dark:bg-slate-50/10">
      {icon}
      <span className="pl-1">{label}</span>
    </a>
  )
}

export default LinkButton
