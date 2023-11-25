import React, { useEffect } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { LoginPasswordField, EmailField } from '../../config/FormFields'
import { loginFormDefaults } from '../../config/Defaults'
import firebase from '../../config/Firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAppContext } from '../base/AppContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT

function Login() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/account')
  }, [user, navigate])

  async function handleSubmit(data) {
    const { email, password } = data
    try {
      const token = await signInWithEmailAndPassword(auth, email, password)
      const customer = await axios.get(`${apiUrl}api/customers/${email}`)
      Cookies.set('token', token.user.accessToken)
      setUser(customer.data)
      navigate('/account')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <CardComponent
      header='Login'
      body={
        <>
          <FormComponent
            fields={[EmailField, LoginPasswordField]}
            onSubmit={handleSubmit}
            defaultFormState={loginFormDefaults}
            ctaText='Login'
          />
        </>
      }
    />
  )
}

export default Login
