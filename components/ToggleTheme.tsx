import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ToggleTheme() {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setTheme('dark')
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }


  return (
    <div onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light')}}>
      {/* <FiSun /> */}
      {/* <FiMoon /> */}
      {
        theme === 'dark' ? <FiMoon /> : <FiSun />
      }
    </div>
  )
}
