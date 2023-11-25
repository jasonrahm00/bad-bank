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
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT

function CreateAccount() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/account')
  }, [user, navigate])

  async function handleSubmit(data) {
    try {
      const token = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const customer = await axios.post(`${apiUrl}api/customers`, {
        name: data.name,
        email: data.email,
      })
      Cookies.set('token', token.user.accessToken)
      setUser(customer.data)
      navigate('/account')
      return { success: true }
    } catch (error) {
      console.log(error)
      let err = new Error()
      err.success = false
      err.message = 'Unable to create account'
      throw err
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
