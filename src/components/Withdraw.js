import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Withdraw() {
  const ctx = useContext(UserContext)
  return <div>Withdraw</div>
}

export default Withdraw
