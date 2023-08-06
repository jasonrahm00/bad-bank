import { useContext } from 'react'
import { UserContext } from '../../config/Context'
import Card from '../base/Card'
import bank from '../../assets/bank.png'

function Home() {
  const ctx = useContext(UserContext)
  return (
    <>
      <Card
        txtcolor='black'
        header='BadBank Landing Page'
        title='Welcome to The Bank'
        text='You can use this bank'
        body={<img src={bank} className='img-fluid' alt='' />}
      />
    </>
  )
}

export default Home
