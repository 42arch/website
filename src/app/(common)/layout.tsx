'use client'

import { SiteFooter } from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const CommonLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1">
        <div className="py-6 lg:py-10 px-0 lg:px-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default CommonLayout
