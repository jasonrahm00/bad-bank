import React from 'react'
import CardComponent from '../base/CardComponent'
import bank from '../../assets/bank.png'

function Home() {
  return (
    <CardComponent
      header='BadBank Landing Page'
      subheader='Welcome to The Bank'
      text='You can use this bank'
      body={<img src={bank} className='img-fluid' alt='' />}
    />
  )
}

export default Home
