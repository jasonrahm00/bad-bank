import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import {
  LoginPasswordField,
  NameField,
  EmailField,
} from '../../config/FormFields'
import { accountFormDefault } from '../../config/Defaults'

function Login() {
  return (
    <CardComponent
      header='Login'
      body={
        <FormComponent
          fields={[NameField, EmailField, LoginPasswordField]}
          onSubmit={() => console.log('need to fix')}
          defaultFormState={accountFormDefault}
          ctaText='Login'
        />
      }
    />
  )
}

export default Login
