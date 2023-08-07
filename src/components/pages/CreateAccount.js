import { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import Card from '../base/Card'

function CreateAccount() {
  const ctx = useContext(UserContext)
  const defaultState = {
    show: true,
    status: '',
    name: '',
    email: '',
    password: '',
  }
  const [state, setState] = useState(defaultState)

  function validate(field, label) {
    if (!field) {
      setState({ ...state, status: 'Error: ' + label })
      setTimeout(() => setState({ ...state, status: '' }), 3000)
      return false
    }
    return true
  }

  function handleCreate(e) {
    e.preventDefault()
    if (!validate(state.name, 'name')) return
    if (!validate(state.email, 'email')) return
    if (!validate(state.password, 'password')) return
    ctx.users.push({
      name: state.name,
      email: state.email,
      password: state.password,
      balance: 100,
    })
    setState({ ...state, show: false })
    console.log(ctx)
  }

  function clearForm(e) {
    e.preventDefault()
    setState(defaultState)
  }

  return (
    <>
      <h1>Create Account</h1>
      <Card
        bgcolor='primary'
        header='Create Account'
        status={state.status}
        body={
          state.show ? (
            <>
              Name
              <br />
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                placeholder='Enter Your Name'
                value={state.name}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              Email Address
              <br />
              <input
                type='text'
                className='form-control'
                id='email'
                name='email'
                placeholder='Enter Your Email'
                value={state.email}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              Password
              <br />
              <input
                type='text'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter A Password'
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <button
                type='submit'
                className='btn btn-light'
                onClick={handleCreate}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <h2>Success</h2>
              <button
                type='submit'
                className='btn btn-light'
                onClick={clearForm}
              >
                Add Another Account
              </button>
            </>
          )
        }
      />
    </>
  )
}

export default CreateAccount
