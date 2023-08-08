import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import CreateAccount from './components/pages/CreateAccount'
import Login from './components/pages/Login'
import Deposit from './components/pages/Deposit'
import Withdraw from './components/pages/Withdraw'
import Balance from './components/pages/Balance'
import AllData from './components/pages/AllData'
import NavComponent from './components/base/NavComponent'
import { UserContext } from './config/Context'
import Container from 'react-bootstrap/Container'

const defaultUsers = [
  {
    name: 'Jane Doe',
    email: 'jane@me.com',
    password: 'Access123',
    balance: 0,
    signedIn: false,
  },
  {
    name: 'Peter Parker',
    email: 'peter@mit.edu',
    password: 'Passcode321',
    balance: 0,
    signedIn: false,
  },
  {
    name: 'John Smith',
    email: 'john@msn.com',
    password: 'Letmein33',
    balance: 0,
    signedIn: false,
  },
]

function App() {
  return (
    <div className='App'>
      <Router>
        <NavComponent />
        <Container>
          <UserContext.Provider
            value={{
              users: defaultUsers,
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
        </Container>
      </Router>
    </div>
  )
}

export default App
