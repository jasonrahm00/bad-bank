import React, { useEffect } from 'react'
import CardComponent from '../base/CardComponent'
import { useAppContext } from '../base/AppContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthRedirect from '../base/AuthRedirect'

function Account() {
  const { user } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!user) navigate('/')
    }, 2500)
  }, [user, navigate])

  return (
    <>
      {user ? (
        <CardComponent
          header={`Welcome, ${user.name}`}
          subheader={`Your available balance is $${user.balance.toLocaleString()}`}
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
          footerText={`Account Number: ${user.accountNumber}`}
        />
      ) : (
        <AuthRedirect />
      )}
    </>
  )
}

export default Account
