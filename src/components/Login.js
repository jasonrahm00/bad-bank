import { useContext } from 'react'
import { UserContext } from '../config/Context'

function Login() {
  const ctx = useContext(UserContext)
  return <div>Login</div>
}

export default Login
