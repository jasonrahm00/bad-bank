import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { AmountField } from '../../config/FormFields'
import { amountDefault } from '../../config/Defaults'
import { useAppContext } from '../base/AppContext'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_ENDPOINT

function Deposit() {
  const { user } = useAppContext()
  async function handleSubmit(data) {
    try {
      const response = await axios.patch(`${apiUrl}api/updateBalance`, {
        email: user.email,
        amount: data.amount,
        action: 'deposit',
      })
      user.balance = response.data.balance
      return { success: true, message: `$${data.amount} added to your account` }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <CardComponent
      header='Deposit'
      subheader={`Available Balance: $${user.balance}`}
      body={
        <FormComponent
          fields={[AmountField]}
          onSubmit={handleSubmit}
          defaultFormState={amountDefault}
          ctaText='Deposit'
        />
      }
    />
  )
}

export default Deposit
