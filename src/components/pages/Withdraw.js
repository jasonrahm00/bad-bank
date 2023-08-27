import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'
import { amountDefault } from '../../config/Defaults'

function Withdraw() {
  const { currentUser, changeBalance } = useUserContext()

  const handleSubmit = (data) => {
    return new Promise((resolve, reject) => {
      if (!currentUser.email) {
        reject(new Error('Please select a user'))
        return
      }
      if (currentUser.balance - Number(data.amount) < 0) {
        reject(new Error('Insufficient Funds'))
        return
      }
      setTimeout(() => {
        let inputAmount = Number(data.amount)
        changeBalance(inputAmount, 'subtract')
        resolve({ success: true, message: 'Withdrawal Successful' })
      }, 300)
    })
  }

  return (
    <CardComponent
      header={
        'Withdraw from ' +
        (currentUser.name ? currentUser.name + "'s " : '') +
        'Account'
      }
      subheader={
        'Balance: $' +
        (currentUser.balance !== undefined ? currentUser.balance : '')
      }
      body={
        <>
          <UserSelectorComponent />
          <FormComponent
            fields={[AmountField]}
            onSubmit={handleSubmit}
            defaultFormState={amountDefault}
            ctaText='Withdraw'
          />
        </>
      }
    />
  )
}

export default Withdraw
