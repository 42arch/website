'use client'

import { SiteFooter } from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const CommonLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default CommonLayout
