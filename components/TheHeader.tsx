import Link from "next/link"
import { FiBook, FiGithub, FiMeh, FiSun, FiUser } from "react-icons/fi"
import styles from './TheHeader.module.css'
import ToggleTheme from "./ToggleTheme"

export default function TheHeader() {
  return (
    <header className={ styles.header }>
      <nav className={ `${styles.nav} h-full px-2 md:px-14 w-full flex justify-between` }>
        <div className={ ` h-full flex justify-center items-center uppercase font-bold` }>
          <Link href='/'>
            MainIssues
          </Link>
        </div>
        <div className={`${styles.right} h-full grid gap-2 md:gap-8 grid-flow-col`}>
          <a>
            <Link href='/post'>
              <div>
                <span className="hidden md:block">Post</span>
                <FiBook className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a>
            <Link href='/emotion'>
              <div>
                <span className="hidden md:block">Emotion</span>
                <FiMeh className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a>
            <Link href='/about'>
              <div>
                <span className="hidden md:block">About</span>
                <FiUser className="md:hidden"/>
              </div>
            </Link>
          </a>
          <a>
            <ToggleTheme />
          </a>
          <a>
            <FiGithub/>
          </a>
        </div>
      </nav>
    </header>
  )
}
