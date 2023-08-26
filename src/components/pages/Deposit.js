import React, { useState } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'
import { amountDefault, toastDefault } from '../../config/Defaults'

function Deposit() {
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
    } else {
      let inputAmount = Number(data.amount)
      changeBalance(inputAmount, 'add')

      setToast({
        message: 'Deposit Successful',
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
          'Depost into ' +
          (currentUser.name ? currentUser.name + "'s " : '') +
          'Account'
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

export default Deposit
