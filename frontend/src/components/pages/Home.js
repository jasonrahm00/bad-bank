import React from 'react'
import CardComponent from '../base/CardComponent'
import bank from '../../assets/bank.png'

function Home() {
  function createAccount() {
    fetch('/api', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <CardComponent
      header='Welcome to The Bad Bank'
      text='Your money is safe with us*'
      colClasses='col-6'
      body={
        <div className='w-75 mx-auto'>
          <img src={bank} className='img-fluid' alt='' />
          <button onClick={createAccount}>Create Test Account</button>
        </div>
      }
      footerText="*Your money isn't actually safe with us"
    />
  )
}

export default Home
