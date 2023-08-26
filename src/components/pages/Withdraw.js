import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'

function Withdraw() {
  const defaultFormState = { amount: '' }
  const { currentUser, changeBalance } = useUserContext()
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (data) => {
    setShowToast(false)
    if (currentUser.balance - Number(data.amount) < 0) {
      setMessage('Insufficient Funds')
      setShowToast(true)
    } else {
      let inputAmount = Number(data.amount)
      changeBalance(inputAmount, 'subtract')
      setMessage('Withdrawal Successful')
      setShowToast(true)
    }
  }

  return (
    <>
      <ToastComponent
        message={message}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <CardComponent
        header={
          'Withdrawn from account for ' +
          (currentUser.name ? currentUser.name : '')
        }
        title={'Balance: $' + (currentUser.balance ? currentUser.balance : '')}
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
