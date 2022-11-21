import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

const BackLayer = () => {
  const route = useRouter()
  const [text, setText] = useState('')
  const [position, setPosition] = useState('bottom-0')
  useEffect(() => {
    switch (route.asPath) {
      case '/about':
        setText('About Me.')
        setPosition('top-24')
        break
      case '/post':
        setText('Blog Post.')
        setPosition('top-48')
        break
      default:
        setText('Hello, There.')
        setPosition('bottom-0')
        break
    }
  }, [route])

  return (
    <div className="m-0">
      <h1
        className={cn(
          position,
          'font-abril fixed text-th-mark tracking-tight whitespace-pre left-[-0.6rem] opacity-100 z-1 transition-all text-[24vmin]'
        )}>
        {text}
      </h1>
    </div>
  )
}

export default BackLayer
