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

  const handleSubmit = (data) => {
    let inputAmount = Number(data.amount)
    changeBalance(inputAmount, 'add')
    setShowToast(true)
  }

  return (
    <>
      <ToastComponent
        message={'Deposit Successful'}
        show={showToast}
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
