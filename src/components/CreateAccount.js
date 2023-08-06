import { useContext } from 'react'
import { UserContext } from '../config/Context'

function CreateAccount() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>Create Account</h1>
    </>
  )
}

export default CreateAccount
