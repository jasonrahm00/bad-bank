import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { PasswordField, NameField, EmailField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import { accountFormDefault } from '../../config/Defaults'

function CreateAccount() {
  const { users, addUser } = useUserContext()

  function handleSubmit(data) {
    return new Promise((resolve, reject) => {
      if (users.find((user) => user.email === data.email)) {
        reject(new Error('Account with that email already exists'))
        return
      }

      setTimeout(() => {
        addUser({
          name: data.name,
          email: data.email,
          password: data.password,
          balance: 100,
        })
        resolve({ success: true, message: 'Account Created', type: 'account' })
      }, 300)
    })
  }

  return (
    <CardComponent
      header='Create Account'
      body={
        <FormComponent
          fields={[NameField, EmailField, PasswordField]}
          onSubmit={handleSubmit}
          defaultFormState={accountFormDefault}
          ctaText='Create Account'
        />
      }
    />
  )
}

export default CreateAccount
