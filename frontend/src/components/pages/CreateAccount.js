import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import {
  SignupPasswordField,
  NameField,
  EmailField,
} from '../../config/FormFields'
import { accountFormDefault } from '../../config/Defaults'

function CreateAccount() {
  return (
    <CardComponent
      header='Create Account'
      body={
        <FormComponent
          fields={[NameField, EmailField, SignupPasswordField]}
          onSubmit={() => console.log('need to fix')}
          defaultFormState={accountFormDefault}
          ctaText='Create Account'
        />
      }
    />
  )
}

export default CreateAccount
