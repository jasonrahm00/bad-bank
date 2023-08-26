import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { PasswordField, NameField, EmailField } from '../../config/FormFields'
import Button from 'react-bootstrap/Button'
import ToastComponent from '../base/ToastComponent'
import { useUserContext } from '../../config/Context'

function CreateAccount() {
  const [showToast, setShowToast] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [message, setMessage] = useState('')
  const { addUser, users } = useUserContext()
  const defaultFormState = {
    name: '',
    email: '',
    password: '',
    accountNumber: '',
  }

  function handleSubmit(data) {
    if (users.find((user) => user.email === data.email)) {
      setMessage('User with that email address already exists')
      setShowToast(true)
    } else {
      addUser({
        name: data.name,
        email: data.email,
        password: data.password,
        balance: 100,
      })
      setAccountCreated(true)
      setMessage('Account Created')
      setShowToast(true)
    }
  }

  return (
    <>
      <ToastComponent
        message={message}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <CardComponent
        bgcolor='primary'
        txtcolor='white'
        header='Create Account'
        body={
          accountCreated ? (
            <Button variant='success' onClick={() => setAccountCreated(false)}>
              Add another account?
            </Button>
          ) : (
            <FormComponent
              fields={[NameField, EmailField, PasswordField]}
              onSubmit={handleSubmit}
              defaultFormState={defaultFormState}
            />
          )
        }
      />
    </>
  )
}

export default CreateAccount
