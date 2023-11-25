import React from 'react'
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
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const auth = getAuth(firebase)

function CreateAccount() {
  const { setUser } = useAppContext()
  const navigate = useNavigate()

  async function handleSubmit(data) {
    try {
      const token = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      Cookies.set('token', token.user.accessToken)
      setUser(token.user.email)
      navigate('/account')
      return { success: true }
    } catch (error) {
      console.log(error)
      throw { success: false, message: 'Unable to create account' }
    }
  }

  return (
    <CardComponent
      header='Create Account'
      body={
        <FormComponent
          fields={[NameField, EmailField, SignupPasswordField]}
          onSubmit={handleSubmit}
          defaultFormState={accountFormDefault}
          ctaText='Create Account'
        />
      }
    />
  )
}

export default CreateAccount
