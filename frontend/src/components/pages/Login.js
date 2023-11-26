import React, { useEffect } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { LoginPasswordField, EmailField } from '../../config/FormFields'
import { loginFormDefaults } from '../../config/Defaults'
import firebase from '../../config/Firebase'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useAppContext } from '../base/AppContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT || '/'

function Login() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    if (user) navigate('/account')
  }, [user, navigate])

  function processSuccess(token, userData) {
    Cookies.set('token', token)
    setUser(userData)
    navigate('/account')
  }

  async function submitEmailPassword(data) {
    const { email, password } = data
    try {
      const token = await signInWithEmailAndPassword(auth, email, password)
      const customer = await axios.get(`${apiUrl}api/login/${email}`)
      processSuccess(token.user.accessToken, customer.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function googleSignin() {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const customer = await axios.get(
        `${apiUrl}api/login/${result.user.email}`
      )
      processSuccess(credential.accessToken, customer.data)
    } catch (error) {
      console.error({ message: error.response.data.message })
    }
  }

  return (
    <>
      <h1>Login</h1>
      <div className='d-flex column-gap-4'>
        <CardComponent
          header='Login with Email and Password'
          mainHeaderLevel='h2'
          cardClasses='p-0'
          body={
            <>
              <FormComponent
                fields={[EmailField, LoginPasswordField]}
                onSubmit={submitEmailPassword}
                defaultFormState={loginFormDefaults}
                ctaText='Login'
              />
            </>
          }
        />
        <CardComponent
          header='Additional Login Methods'
          mainHeaderLevel='h2'
          cardClasses='p-0'
          body={
            <button className='btn btn-primary' onClick={googleSignin}>
              Login with Google
            </button>
          }
        />
      </div>
    </>
  )
}

export default Login
