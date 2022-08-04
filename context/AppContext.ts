import { createContext } from "react"

interface AppProps {
  curTheme: string | undefined
  setCurTheme: (theme: string | undefined) => void
}

const AppContext = createContext({} as AppProps)

export default AppContext