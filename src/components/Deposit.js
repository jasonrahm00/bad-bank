import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Deposit() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>Deposit</h1>
    </>
  )
}

export default Deposit
