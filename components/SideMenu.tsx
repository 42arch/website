import Link from 'next/link'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FiPlus, FiChevronsUp, FiShare2, FiList, FiTag } from 'react-icons/fi'

interface MenuWrapperProps {
  children: JSX.Element
}
const MenuWrapper: FunctionComponent<MenuWrapperProps> = ({ children }) => {
  return (
    <div className='w-8 h-8 my-1 bg-primary rounded-full flex justify-center items-center hover:opacity-80'>
      {
        children
      }
    </div>
  )
}

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
          <MenuWrapper>
            <FiList className='w-4 h-4 my-1 hover:opacity-80'/>
          </MenuWrapper>
          <MenuWrapper>
            <FiShare2 className='w-4 h-4 my-1 hover:opacity-80'/>
          </MenuWrapper>
          <MenuWrapper>
            <Link href={'/post/tag'}>
              <FiTag className='w-4 h-4 my-1 hover:opacity-80'/>
            </Link>
          </MenuWrapper>
        </div>
      }
      {
          <>
            <MenuWrapper>
              <FiPlus onClick={() => { setCollapse(!collapse) }} className='w-4 h-4 my-1 hover:opacity-80 transition duration-150 ease-in-out' style={ collapse ? {transform: 'rotate(135deg)'} : {}}/> 
            </MenuWrapper>
            {
              topBtnShow && <MenuWrapper>
                <FiChevronsUp className='w-4 h-4 my-1 hover:opacity-80' onClick={ scrollUp } />
              </MenuWrapper>
            }
          </>
      }
    </div>
  )
}

export default SideMenu
