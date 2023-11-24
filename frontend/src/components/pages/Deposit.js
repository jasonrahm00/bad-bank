import React from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { AmountField } from '../../config/FormFields'
import { amountDefault } from '../../config/Defaults'

function Deposit() {
  return (
    <CardComponent
      header='Deposit'
      body={
        <FormComponent
          fields={[AmountField]}
          onSubmit={() => console.log('need to update')}
          defaultFormState={amountDefault}
          ctaText='Deposit'
        />
      }
    />
  )
}

export default Deposit
