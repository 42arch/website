import React, { useEffect, useState } from 'react'
import { FiChevronsUp } from 'react-icons/fi'

export default function Back2Top() {
  const [btnShow, setBtnShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) {
        setBtnShow(true)
      } else {
        setBtnShow(false)
      }
    })
  })

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='fixed cursor-pointer bottom-16 right-2 md:right-24'>
      {
        btnShow && (
          <FiChevronsUp className='w-6 h-6' onClick={ scrollUp } />
        )
      }
    </div>
  )
}
