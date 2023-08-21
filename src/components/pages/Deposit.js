import React, { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'

function Deposit() {
  const defaultFormState = { amount: '' }
  const ctx = useContext(UserContext)
  const [currentUser, setUser] = useState(ctx.currentUser)
  const [updated, setUpdated] = useState(false)
  const [balance, setBalance] = useState(
    ctx.currentUser ? ctx.currentUser.balance : 0
  )

  const handleSubmit = (data) => {
    let newBalance = (ctx.currentUser.balance += Number(data.amount))
    setBalance(newBalance)
    setUpdated(true)
  }

  const handleSelector = (e) => {
    let newUser = (ctx.currentUser = ctx.users.filter(
      (user) => user.accountNumber == e.target.value
    ))
    let currentUser = (ctx.currentUser = newUser[0])
    setUser(currentUser)
    setBalance(currentUser.balance)
  }

  return (
    <>
      {updated && <ToastComponent message={'Deposit Made'} />}
      <CardComponent
        header={
          'Depost into account for ' + (currentUser ? currentUser.name : '')
        }
        title={'Balance: $' + balance}
        body={
          <>
            <label htmlFor='user-selector'>Select User</label>
            <select
              name='user'
              id='user-selector'
              defaultValue={currentUser ? currentUser.accountNumber : 'default'}
              onChange={handleSelector}
            >
              <option value='default' disabled>
                Select User
              </option>
              {ctx.users &&
                ctx.users.map((user, index) => {
                  return (
                    <option value={user.accountNumber} key={index}>
                      {user.name}
                    </option>
                  )
                })}
            </select>
            <FormComponent
              fields={[AmountField]}
              onSubmit={handleSubmit}
              defaultFormState={defaultFormState}
            />
          </>
        }
      />
    </>
  )
}

export default Deposit
