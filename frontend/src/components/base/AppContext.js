import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const userCookie =
    Cookies.get('user') !== undefined ? Cookies.get('user') : null
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null)

  useEffect(() => {
    Cookies.set('user', JSON.stringify(user))
    console.log(Cookies.get('user'))
  }, [user])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined)
    throw new Error('useAppContext must be within a AppProvider')
  return context
}
