import React, { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'

function Withdraw() {
  const defaultFormState = { amount: '' }
  const { currentUser, changeBalance } = useUserContext()
  const [updated, setUpdated] = useState(false)

  const handleSubmit = (data) => {
    setUpdated(false)
    if (currentUser.balance - Number(data.amount) < 0) {
      alert('Insufficient Funds')
    } else {
      let inputAmount = Number(data.amount)
      changeBalance(inputAmount, 'subtract')
      setUpdated(true)
    }
  }

  return (
    <>
      {updated && <ToastComponent message={'Withdrawal Complete'} />}
      <CardComponent
        header={
          'Withdrawn from account for ' + (currentUser ? currentUser.name : '')
        }
        title={'Balance: $' + currentUser.balance}
        body={
          <>
            <UserSelectorComponent />
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
