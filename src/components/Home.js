import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Home() {
  const ctx = useContext(UserContext)
  return (
    <div>
      <h1>Home</h1>
      <div>{JSON.stringify(ctx)}</div>
    </div>
  )
}

export default Home
