'use client'

import SiteHeader from '@/components/SiteHeader'
import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const CommonLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1">{children}</div>
    </div>
  )
}

export default CommonLayout