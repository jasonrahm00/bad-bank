import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Deposit() {
  const ctx = useContext(UserContext)
  return <div>Deposit</div>
}

export default Deposit
