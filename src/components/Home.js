import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Home() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>Home</h1>
      <div>{JSON.stringify(ctx)}</div>
    </>
  )
}

export default Home
