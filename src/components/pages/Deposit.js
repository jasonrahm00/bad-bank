import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import ToastComponent from '../base/ToastComponent'
import { AmountField } from '../../config/FormFields'

function Deposit() {
  const ctx = useContext(UserContext)
  ctx.currentUser = ctx.users[0]
  const defaultFormState = {
    amount: '',
  }

  const handleSubmit = (data) => {
    ctx.currentUser.balance += Number(data.amount)
  }

  return (
    <>
      <CardComponent
        header={'Depost into account for ' + ctx.currentUser.name}
        title={'Balance: $' + ctx.currentUser.balance}
        body={
          <FormComponent
            fields={[AmountField]}
            onSubmit={handleSubmit}
            defaultFormState={defaultFormState}
          />
        }
      />
    </>
  )
}

export default Deposit
