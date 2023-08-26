import { createContext, useContext, useState } from 'react'
import { defaultUsers } from './Defaults'

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultUsers)
  const [currentUser, setCurrent] = useState({})
  const [currentBalance, updateBalance] = useState(currentUser.balance)

  const addUser = (newUser) => {
    setUsers([...users, newUser])
  }

  const changeUser = (newCurrent) => {
    setCurrent(newCurrent)
  }

  const changeBalance = (amount, operation) => {
    if (operation === 'add') {
      let newBalance = (currentUser.balance += amount)
      updateBalance(newBalance)
    }
    if (operation === 'subtract') {
      let newBalance = (currentUser.balance -= amount)
      updateBalance(newBalance)
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        currentUser,
        changeUser,
        changeBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export default UserContextProvider
