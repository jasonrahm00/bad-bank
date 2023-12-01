import React, { useEffect, useState } from 'react'
import CardComponent from '../base/CardComponent'
import { useAppContext } from '../base/AppContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthRedirect from '../base/AuthRedirect'
import ToastComponent from '../base/ToastComponent'
import { toastDefault } from '../../config/Defaults'

function Account() {
  const { user, firstLogin, setFirstLogin } = useAppContext()
  const navigate = useNavigate()
  const [toast, setToast] = useState(toastDefault)

  useEffect(() => {
    if (firstLogin) setToast(true)
    setTimeout(() => {
      if (firstLogin) setFirstLogin(false)
      if (!user) navigate('/')
    }, 2500)
  }, [user, navigate, firstLogin])

  return (
    <>
      {user ? (
        <CardComponent
          header={`Welcome, ${user.name}`}
          subheader={`Your available balance is $${user.balance.toLocaleString()}`}
          body={
            <>
              <ToastComponent
                message='Account Created'
                show={firstLogin}
                variant='success'
                onClose={() => setToast(toastDefault)}
              />
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
