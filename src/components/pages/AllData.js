import { useContext } from 'react'
import { UserContext } from '../../config/Context'

function AllData() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>All Data</h1>
    </>
  )
}

export default AllData
