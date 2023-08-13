import { useContext } from 'react'
import { UserContext } from '../../config/Context'

function Login() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>{ctx.currentUser ? 'Hello ' + ctx.currentUser.name : 'Login'}</h1>
    </>
  )
}

export default Login
