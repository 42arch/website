import Image from "next/image"
import Link from "next/link"
import { FiBook, FiClipboard, FiGithub, FiMeh, FiSun, FiUser } from "react-icons/fi"
import ToggleTheme from "./ToggleTheme"

export default function TheHeader() {
  return (
    <header className='py-10 text-xl select-none'>
      <nav className={ `text-xl h-full md:px-14 w-full flex justify-between items-center` }>
        <div className={ `cursor-pointer h-full flex justify-center items-center uppercase font-semibold` }>
          <Link href='/'>
            <div className='flex justify-center items-center'>
              <Image src={'/images/ghost.png'} width='48' height='48' alt="icon"></Image>
              <span className='hidden md:block md:pl-6'>MainIssues</span>
            </div>
          </Link>
        </div>
        <div className={`h-full grid gap-3 md:gap-8 grid-flow-col`}>
          <a className="nav-link">
            <Link href='/post'>
              <div className="nav-icon">
                <span className="hidden md:block">Post</span>
                <FiBook className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a className="nav-link">
            <Link href='/note'>
              <div className="nav-icon">
                <span className="hidden md:block">Note</span>
                <FiClipboard className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a className="nav-link">
            <Link href='/record'>
              <div className="nav-icon">
                <span className="hidden md:block">Record</span>
                <FiMeh className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a className="nav-link">
            <Link href='/about'>
              <div className="nav-icon">
                <span className="hidden md:block">About</span>
                <FiUser className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a className="nav-link">
            <ToggleTheme />
          </a>
          <a className="nav-link hidden md:block" href="https://github.com/REND42" target='_blank' rel="noreferrer" >
            <FiGithub/>
          </a>
        </div>
      </nav>
    </header>
  )
}
