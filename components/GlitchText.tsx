import React, { FC } from 'react'
import cn from 'classnames'
import s from './GlitchText.module.css'

const GlitchText: FC<{ text: string }> = ({ text }) => {
  return (
    <h1
      className={cn(
        s.glitch_text,
        'text-th-text-h text-[2.75rem] md:text-[3.25rem] font-bold font-sans'
      )}
      data-text={text}>
      {text}
    </h1>
  )
}

export default GlitchText
