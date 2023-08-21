import React, { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'

function Withdraw() {
  const defaultFormState = { amount: '' }
  const ctx = useContext(UserContext)
  const [currentUser, setUser] = useState(ctx.currentUser)
  const [updated, setUpdated] = useState(false)
  const [balance, setBalance] = useState(
    ctx.currentUser ? ctx.currentUser.balance : 0
  )

  const handleSubmit = (data) => {
    let newBalance = (ctx.currentUser.balance -= Number(data.amount))
    setBalance(newBalance)
    setUpdated(true)
  }

  const handleSelector = (e) => {
    let currentUser = (ctx.currentUser = ctx.users[e.target.value])
    setUser(currentUser)
    setBalance(currentUser.balance)
  }

  return (
    <>
      {updated && <ToastComponent message={'Withdrawal Complete'} />}
      <CardComponent
        header={
          'Withdrawn from account for ' + (currentUser ? currentUser.name : '')
        }
        title={'Balance: $' + balance}
        body={
          <>
            <label htmlFor='user-selector'>Select User</label>
            <select
              name='user'
              id='user-selector'
              defaultValue='default'
              onChange={handleSelector}
            >
              <option value='default' disabled>
                Select User
              </option>
              {ctx.users &&
                ctx.users.map((user, index) => {
                  return (
                    <option value={index} key={index}>
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

export default Withdraw
