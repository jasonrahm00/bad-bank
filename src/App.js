import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Balance from './components/Balance'
import AllData from './components/AllData'
import Navbar from './components/MainNav'
import { UserContext } from './config/Context'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <UserContext.Provider
          value={{
            users: [
              {
                name: 'jason',
                email: 'jason@email.com',
                password: 'password',
                balance: 100,
              },
            ],
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/login' element={<Login />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/withdraw' element={<Withdraw />} />
            <Route path='/balance' element={<Balance />} />
            <Route path='/all-data' element={<AllData />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App
