import { useContext } from 'react'
import { UserContext } from '../../config/Context'

function Balance() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>Balance</h1>
    </>
  )
}

export default Balance
