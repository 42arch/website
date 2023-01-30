import Link from 'next/link'
import React from 'react'
import ThemeToogle from './ThemeToogle'

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <nav>
        <Link href={'/'}>42Arch</Link>
      </nav>
      <div>
        <ThemeToogle />
      </div>
    </header>
  )
}

export default SiteHeader
