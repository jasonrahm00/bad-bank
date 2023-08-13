import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import CreateAccount from './components/pages/CreateAccount'
import Deposit from './components/pages/Deposit'
import Withdraw from './components/pages/Withdraw'
import AllData from './components/pages/AllData'
import NavComponent from './components/base/NavComponent'
import { UserContext } from './config/Context'
import Container from 'react-bootstrap/Container'

const defaultUsers = [
  {
    name: 'Jane Doe',
    email: 'jane@me.com',
    password: 'Access123',
    balance: 100,
  },
  {
    name: 'Peter Parker',
    email: 'peter@mit.edu',
    password: 'Passcode321',
    balance: 100,
  },
  {
    name: 'John Smith',
    email: 'john@msn.com',
    password: 'Letmein33',
    balance: 100,
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
              currentUser: null,
              users: defaultUsers,
            }}
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/deposit' element={<Deposit />} />
              <Route path='/withdraw' element={<Withdraw />} />
              <Route path='/all-data' element={<AllData />} />
            </Routes>
          </UserContext.Provider>
        </Container>
      </Router>
    </div>
  )
}

export default App
