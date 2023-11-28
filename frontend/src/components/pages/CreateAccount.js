import React, { useEffect, useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import {
  SignupPasswordField,
  NameField,
  EmailField,
} from '../../config/FormFields'
import { accountFormDefault } from '../../config/Defaults'
import firebase from '../../config/Firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAppContext } from '../base/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT || '/'

const extraButtonStyle = {
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
}

function CreateAccount() {
  const { user, setUser, setFirstLogin } = useAppContext()
  const [googleCreate, setGoogleCreate] = useState(false)
  const [googleFields, setGoogleFields] = useState({ email: '', name: '' })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/account')
    if (auth.currentUser) {
      setGoogleFields({
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
      })
      setGoogleCreate(true)
    }
  }, [user, navigate, setGoogleCreate, setGoogleFields])

  async function handleSubmit(data) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      const idToken = await auth.currentUser.getIdToken()
      const response = await axios({
        method: 'post',
        url: `${apiUrl}api/customers`,
        headers: {
          Authorization: idToken,
        },
        data: {
          name: data.name,
        },
      })
      setFirstLogin(true)
      setUser(response.data)
      navigate('/account')
      return { success: true }
    } catch (error) {
      console.log(error)

      throw { message: `Account for ${data.email} aleady exists` }
    }
  }

  async function handleGoogleCreate(data) {
    try {
      const idToken = await auth.currentUser.getIdToken()
      const response = await axios({
        method: 'post',
        url: `${apiUrl}api/customers`,
        headers: {
          Authorization: idToken,
        },
        data: {
          name: data.name,
        },
      })
      setFirstLogin(true)
      setUser(response.data)
      navigate('/account')
      return { success: true }
    } catch (error) {
      console.log(error)

      throw { message: `Account for ${data.email} aleady exists` }
    }
  }

  return (
    <CardComponent
      header='Create Account'
      body={
        <>
          {googleCreate ? (
            <>
              <FormComponent
                fields={[NameField, EmailField]}
                onSubmit={handleGoogleCreate}
                defaultFormState={googleFields}
                ctaText='Create Account using Gmail'
                activateButton='true'
              />
              <Button
                style={extraButtonStyle}
                variant='primary'
                onClick={() => {
                  auth.signOut()
                  setGoogleCreate(false)
                }}
              >
                Use a Different Email
              </Button>
            </>
          ) : (
            <FormComponent
              fields={[NameField, EmailField, SignupPasswordField]}
              onSubmit={handleSubmit}
              defaultFormState={accountFormDefault}
              ctaText='Create Account'
            />
          )}
        </>
      }
    />
  )
}

export default CreateAccount
