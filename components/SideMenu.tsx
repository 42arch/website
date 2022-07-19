import React, { useEffect, useState } from 'react'
import { FiPlus, FiChevronsUp, FiShare2, FiList } from 'react-icons/fi'

const SideMenu = () => {
  const [collapse, setCollapse] = useState<boolean>(false)

  const [topBtnShow, setTopBtnShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) {
        setTopBtnShow(true)
      } else {
        setTopBtnShow(false)
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
    <div className='fixed flex flex-col cursor-pointer bottom-16 right-2 md:right-24'>
      {
        <div className={`flex flex-col justify-center items-center transition duration-150 ease-in-out ${collapse ? 'block' : 'hidden'}`}>
          <FiList className='w-5 h-5 my-1 hover:opacity-80'/>
          <FiShare2 className='w-5 h-5 my-1 hover:opacity-80'/>
        </div>
      }
      {
        <div>
          <FiPlus onClick={() => { setCollapse(!collapse) }} className='w-6 h-6 my-1 hover:opacity-80 transition duration-150 ease-in-out' style={ collapse ? {transform: 'rotate(135deg)'} : {}}/> 
          {
            topBtnShow && <FiChevronsUp className='w-6 h-6' onClick={ scrollUp } />
          }
        </div>
      }
    </div>
  )
}

export default SideMenu
