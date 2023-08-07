import { useContext } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { PasswordField, NameField, EmailField } from '../../config/FormFields'

function CreateAccount() {
  const ctx = useContext(UserContext)
  const defaultState = {
    show: true,
    status: '',
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
    console.log(ctx)
  }

  return (
    <>
      <h1>Create Account</h1>
      <CardComponent
        bgcolor='primary'
        header='Create Account'
        body={
          <FormComponent
            fields={[NameField, EmailField, PasswordField]}
            onSubmit={handleCreate}
            defaultFormState={defaultState}
          />
        }
      />
    </>
  )
}

export default CreateAccount
