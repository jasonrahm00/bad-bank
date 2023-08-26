import { createContext, useContext, useState } from 'react'
const defaultUsers = [
  {
    name: 'Jane Doe',
    email: 'jane@me.com',
    password: 'Access123',
    balance: 100,
  },
  {
    name: 'Peter Parker',
    email: 'peter@mit.edu',
    password: 'Passcode321',
    balance: 100,
  },
  {
    name: 'John Smith',
    email: 'john@msn.com',
    password: 'Letmein33',
    balance: 100,
  },
]

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultUsers)
  const [currentUser, setCurrent] = useState(defaultUsers[0])

  const addUser = (newUser) => {
    setUsers([...users, newUser])
  }

  const changeUser = (newCurrent) => {
    setCurrent(newCurrent)
  }

  return (
    <UserContext.Provider value={{ users, addUser, currentUser, changeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export default UserContextProvider
