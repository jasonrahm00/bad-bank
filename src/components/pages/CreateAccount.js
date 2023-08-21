import React, { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { PasswordField, NameField, EmailField } from '../../config/FormFields'
import Button from 'react-bootstrap/Button'
import ToastComponent from '../base/ToastComponent'

function CreateAccount() {
  const [accountCreated, setAccountCreated] = useState(false)
  const ctx = useContext(UserContext)
  const defaultFormState = {
    name: '',
    email: '',
    password: '',
  }

  function handleCreate(data) {
    ctx.users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
    })
    setAccountCreated(true)
  }

  return (
    <>
      {accountCreated && <ToastComponent message={'Account created'} />}
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
              onSubmit={handleCreate}
              defaultFormState={defaultFormState}
            />
          )
        }
      />
    </>
  )
}

export default CreateAccount
