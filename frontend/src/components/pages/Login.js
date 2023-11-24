import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { LoginPasswordField, EmailField } from '../../config/FormFields'
import { loginFormDefaults } from '../../config/Defaults'
import firebase from '../../config/Firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAppContext } from '../base/AppContext'
import Cookies from 'js-cookie'

const auth = getAuth(firebase)

function Login(data) {
  const { setUser } = useAppContext()

  const useLoginForm = async (data) => {
    try {
      const token = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      Cookies.set('token', token.user.accessToken)
      setUser(token.user.email)
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
            onSubmit={useLoginForm}
            defaultFormState={loginFormDefaults}
            ctaText='Login'
          />
        </>
      }
    />
  )
}

export default Login
