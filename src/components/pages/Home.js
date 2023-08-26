import React from 'react'
import CardComponent from '../base/CardComponent'
import bank from '../../assets/bank.png'

function Home() {
  return (
    <CardComponent
      header='Welcome to The Bank'
      text='For all your banking needs'
      colClasses='col-6'
      body={
        <div className='w-75 mx-auto'>
          <img src={bank} className='img-fluid' alt='' />
        </div>
      }
    />
  )
}

export default Home
