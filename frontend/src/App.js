import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import CreateAccount from './components/pages/CreateAccount'
import Deposit from './components/pages/Deposit'
import Withdraw from './components/pages/Withdraw'
import Login from './components/pages/Login'
import NavComponent from './components/base/NavComponent'
import Container from 'react-bootstrap/Container'
import { AppProvider } from './components/base/AppContext'
import Account from './components/pages/Account'

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Router>
          <NavComponent />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/deposit' element={<Deposit />} />
              <Route path='/withdraw' element={<Withdraw />} />
              <Route path='/login' element={<Login />} />
              <Route path='/account' element={<Account />} />
            </Routes>
          </Container>
        </Router>
      </AppProvider>
    </div>
  )
}

export default App
