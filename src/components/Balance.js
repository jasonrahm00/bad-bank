import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Balance() {
  const ctx = useContext(UserContext)
  return <div>Balance</div>
}

export default Balance
