import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { PasswordField, NameField, EmailField } from '../../config/FormFields'
import Button from 'react-bootstrap/Button'
import ToastComponent from '../base/ToastComponent'
import { useUserContext } from '../../config/Context'
import { toastDefault, accountFormDefault } from '../../config/Defaults'

function CreateAccount() {
  const [toast, setToast] = useState(toastDefault)
  const [accountCreated, setAccountCreated] = useState(false)
  const { addUser } = useUserContext()

  function handleSubmit(data) {
    addUser({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
    })
    setToast({
      message: 'Account Created',
      showToast: true,
      variant: 'success',
    })
    setAccountCreated(true)
  }

  return (
    <>
      <ToastComponent
        message={toast.message}
        show={toast.showToast}
        variant={toast.variant}
        onClose={() => setToast(toastDefault)}
      />
      <CardComponent
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
              defaultFormState={accountFormDefault}
            />
          )
        }
      />
    </>
  )
}

export default CreateAccount
