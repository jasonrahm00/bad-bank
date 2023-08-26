import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'

function Deposit() {
  const defaultFormState = { amount: '' }
  const { currentUser, changeBalance } = useUserContext()
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')
  const [toastBg, setToastBg] = useState('')

  const handleSubmit = (data) => {
    if (!currentUser.email) {
      setMessage('Please select a user')
      setToastBg('danger')
      setShowToast(true)
      return
    } else {
      let inputAmount = Number(data.amount)
      changeBalance(inputAmount, 'add')
      setToastBg('success')
      setMessage('Deposit Successful')
      setShowToast(true)
    }
  }

  return (
    <>
      <ToastComponent
        message={message}
        show={showToast}
        variant={toastBg}
        onClose={() => setShowToast(false)}
      />
      <CardComponent
        header={
          'Depost into account for ' +
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

export default Deposit
