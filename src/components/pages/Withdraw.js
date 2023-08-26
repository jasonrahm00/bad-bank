import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'
import { amountDefault, toastDefault } from '../../config/Defaults'

function Withdraw() {
  const { currentUser, changeBalance } = useUserContext()
  const [toast, setToast] = useState(toastDefault)

  const handleSubmit = (data) => {
    if (!currentUser.email) {
      setToast({
        message: 'Please select a user',
        showToast: true,
        variant: 'danger',
      })
      return
    }
    if (currentUser.balance - Number(data.amount) < 0) {
      setToast({
        message: 'Insufficient Funds',
        showToast: true,
        variant: 'danger',
      })
    } else {
      let inputAmount = Number(data.amount)
      changeBalance(inputAmount, 'subtract')

      setToast({
        message: 'Withdrawal Successful',
        showToast: true,
        variant: 'success',
      })
    }
  }

  return (
    <>
      <ToastComponent
        message={toast.message}
        show={toast.showToast}
        variant={toast.variant}
        onClose={() => setToast(toastDefault)}
      />
      <CardComponent
        header={
          'Withdrawn from account for ' +
          (currentUser.name ? currentUser.name : '')
        }
        subheader={
          'Balance: $' + (currentUser.balance ? currentUser.balance : '')
        }
        body={
          <>
            <UserSelectorComponent />
            <FormComponent
              fields={[AmountField]}
              onSubmit={handleSubmit}
              defaultFormState={amountDefault}
            />
          </>
        }
      />
    </>
  )
}

export default Withdraw
