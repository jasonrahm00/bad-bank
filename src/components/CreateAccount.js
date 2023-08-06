import { useContext } from 'react'
import { UserContext } from '../config/Context'

function CreateAccount() {
  const ctx = useContext(UserContext)
  return <div>CreateAccount</div>
}

export default CreateAccount
