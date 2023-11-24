import React from 'react'
import CardComponent from '../base/CardComponent'
import bank from '../../assets/bank.png'
import axios from 'axios'

function Home() {
  function getAllCustomers() {
    axios.get('/api/customers').then((response) => {
      console.log(response.data)
    })
  }

  return (
    <CardComponent
      header='Welcome to The Okay Bank'
      text='Your money is safe with us*'
      colClasses='col-6'
      body={
        <div className='w-75 mx-auto'>
          <img src={bank} className='img-fluid' alt='' />
          <button onClick={getAllCustomers}>Get All Customers</button>
        </div>
      }
      footerText="*We're getting better. Your money is a little safer."
    />
  )
}

export default Home
