import React, { useContext, useState } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'

function Deposit() {
  const defaultFormState = { amount: '' }
  const { currentUser, changeBalance } = useUserContext()
  const [updated, setUpdated] = useState(false)

  const handleSubmit = (data) => {
    let inputAmount = Number(data.amount)
    changeBalance(inputAmount, 'add')
    setUpdated(true)
  }

  return (
    <>
      {updated && <ToastComponent message={'Deposit Made'} />}
      <CardComponent
        header={
          'Depost into account for ' + (currentUser ? currentUser.name : '')
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

export default Deposit
