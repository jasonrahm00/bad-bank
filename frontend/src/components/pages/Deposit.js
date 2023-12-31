import React, { useEffect } from 'react'
import CardComponent from '../base/CardComponent'
import FormComponent from '../base/FormComponent'
import { AmountField } from '../../config/FormFields'
import { amountDefault } from '../../config/Defaults'
import { useAppContext } from '../base/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthRedirect from '../base/AuthRedirect'
import firebase from '../../config/Firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebase)
const apiUrl = process.env.REACT_APP_API_ENDPOINT || '/'

function Deposit() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!user) navigate('/')
    }, 2500)
  }, [user, navigate])

  async function handleSubmit(data) {
    try {
      const idToken = await auth.currentUser.getIdToken()
      const response = await axios({
        method: 'patch',
        url: `${apiUrl}api/update-balance`,
        headers: {
          Authorization: idToken,
        },
        data: {
          amount: data.amount,
          action: 'deposit',
        },
      })
      setUser({ ...user, balance: response.data.balance })
      return {
        success: true,
        message: `$${data.amount} deposited into your account`,
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {user ? (
        <CardComponent
          header='Deposit'
          subheader={`Available Balance: $${user.balance.toLocaleString()}`}
          body={
            <FormComponent
              fields={[AmountField]}
              onSubmit={handleSubmit}
              defaultFormState={amountDefault}
              ctaText='Deposit'
            />
          }
        />
      ) : (
        <AuthRedirect />
      )}
    </>
  )
}

export default Deposit
