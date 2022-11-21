import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon, FiCpu } from 'react-icons/fi'

type Theme = 'Light' | 'Dark' | 'Cyber'
const ThemeIcons: { [key: string]: JSX.Element } = {
  Light: <FiSun />,
  Dark: <FiMoon />,
  Cyber: <FiCpu />
}
const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes = ['Light', 'Dark', 'Cyber']
  const [curIndex, setCurIndex] = useState(0)
  useEffect(() => setMounted(true), [])

  const changeTheme = () => {
    if (curIndex < themes.length - 1) {
      setCurIndex((curIndex) => curIndex + 1)
      setTheme(themes[curIndex + 1])
    } else {
      setCurIndex(0)
      setTheme(themes[0])
    }
  }

  if (!mounted) return null

  return (
    <button
      className="mx-6 hover:opacity-80 transition-all"
      title={theme}
      onClick={changeTheme}>
      {ThemeIcons[themes[curIndex]]}
    </button>
  )
}

export default ThemeChanger
