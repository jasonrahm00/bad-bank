import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { AmountField } from '../../config/FormFields'
import { useUserContext } from '../../config/Context'
import UserSelectorComponent from '../base/UserSelectorComponent'
import { amountDefault } from '../../config/Defaults'

function Deposit() {
  const { currentUser, changeBalance } = useUserContext()

  const handleSubmit = (data) => {
    return new Promise((resolve, reject) => {
      if (!currentUser.email) {
        reject(new Error('Please select a user'))
        return
      }
      setTimeout(() => {
        let inputAmount = Number(data.amount)
        changeBalance(inputAmount, 'add')
        resolve({ success: true, message: 'Deposit Successful' })
      }, 300)
    })
  }

  return (
    <CardComponent
      header={
        'Deposit into ' +
        (currentUser.name !== undefined ? currentUser.name + "'s " : '') +
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
            ctaText='Deposit'
          />
        </>
      }
    />
  )
}

export default Deposit
