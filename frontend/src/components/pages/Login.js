import React, { useEffect, useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import Button from 'react-bootstrap/Button'
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
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ToastComponent from '../base/ToastComponent'
import { toastDefault } from '../../config/Defaults'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT || '/'

function Login() {
  const { user, setUser, setToken } = useAppContext()
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()
  const [toast, setToast] = useState(toastDefault)
  const [noGoogleAccount, setNoGoogleAccount] = useState(false)

  useEffect(() => {
    if (user) navigate('/account')
  }, [user, navigate])

  function processSuccess(userData) {
    setUser(userData)
    navigate('/account')
  }

  async function submitEmailPassword(data) {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const idToken = await auth.currentUser.getIdToken()
      const response = await axios({
        method: 'post',
        url: `${apiUrl}api/login`,
        headers: {
          Authorization: idToken,
        },
      })
      processSuccess(response.data)
    } catch (error) {
      let response = JSON.parse(JSON.stringify(error))
      let message = 'unable to login'
      if (response.name === 'FirebaseError') message = response.code
      throw { message }
    }
  }

  async function googleSignin() {
    try {
      await signInWithPopup(auth, provider)
      const idToken = await auth.currentUser.getIdToken()
      const response = await axios({
        method: 'post',
        url: `${apiUrl}api/login`,
        headers: {
          Authorization: idToken,
        },
      })
      processSuccess(response.data)
    } catch (error) {
      setNoGoogleAccount(true)
      const message = error.response.data.message
      console.error(message)
      setToast({
        message,
        showToast: true,
        variant: 'danger',
      })
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
            <>
              <ToastComponent
                message={toast.message}
                show={toast.showToast}
                variant={toast.variant}
                onClose={() => setToast(toastDefault)}
              />
              <Button
                variant='primary'
                type='submit'
                disabled={noGoogleAccount}
                onClick={googleSignin}
              >
                Login with Google
              </Button>
              {noGoogleAccount && (
                <p className='mt-3'>
                  Unable to locate an account with your gmail address. If you
                  wish to create an account with that email address, please go
                  to the <Link to='/create-account'>Create Account page</Link>
                </p>
              )}
            </>
          }
        />
      </div>
    </>
  )
}

export default Login
