import { useTheme } from 'next-themes'
import React, { useContext, useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import AppContext from '../context/AppContext'

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const { setCurTheme } = useContext(AppContext)

  useEffect(() => {
    setCurTheme(theme)
  }, [theme])

  // fix the hydration failed error
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setTheme('dark')
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <div className="flex justify-center items-center" onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light')}}>
      {
        theme === 'dark' ? <FiMoon /> : <FiSun />
      }
    </div>
  )
}
