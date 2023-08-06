import { useContext } from 'react'
import { UserContext } from '../config/Context'

function AllData() {
  const ctx = useContext(UserContext)
  return <div>AllData</div>
}

export default AllData
