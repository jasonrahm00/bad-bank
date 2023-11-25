import React from 'react'
import CardComponent from '../base/CardComponent'
import { useAppContext } from '../base/AppContext'
import { Link } from 'react-router-dom'

function Account() {
  const { user } = useAppContext()
  return (
    <CardComponent
      header={`Welcome, ${user.name}`}
      subheader={`Your available balance is $${user.balance}`}
      body={
        <>
          <p>
            If you would like to deposit or withdraw funds, please visit the
            corresponding page.
          </p>
          <div className='d-flex column-gap-3'>
            <Link className='btn btn-primary' to={'/deposit'}>
              Deposit
            </Link>
            <Link className='btn btn-primary' to={'/withdraw'}>
              Withdraw
            </Link>
          </div>
        </>
      }
    />
  )
}

export default Account
