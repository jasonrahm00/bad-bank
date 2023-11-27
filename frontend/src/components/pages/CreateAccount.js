import React, { useEffect } from 'react'
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

function CreateAccount() {
  const { user, setUser, token, setToken } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/account')
  }, [user, navigate])

  async function handleSubmit(data) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      const idToken = await auth.currentUser.getIdToken()
      console.log(idToken)
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
          {token ? (
            <FormComponent
              fields={[NameField, EmailField]}
              onSubmit={handleSubmit}
              defaultFormState={{ name: '', email: token.user.email }}
              ctaText='Create Account using Gmail'
            />
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
