import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import CreateAccount from './components/pages/CreateAccount'
import Deposit from './components/pages/Deposit'
import Withdraw from './components/pages/Withdraw'
import AllData from './components/pages/AllData'
import NavComponent from './components/base/NavComponent'
import UserContextProvider from './config/Context'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <Router>
          <NavComponent />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/deposit' element={<Deposit />} />
              <Route path='/withdraw' element={<Withdraw />} />
              <Route path='/all-data' element={<AllData />} />
            </Routes>
          </Container>
        </Router>
      </UserContextProvider>
    </div>
  )
}

export default App
