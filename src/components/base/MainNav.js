import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

function MainNav() {
  return (
    <Navbar expand='lg'>
      <Container>
        <Nav>
          <Link to='/' className='navbar-brand'>
            BadBank
          </Link>
          <Navbar.Toggle aria-controls='nav-collapse' />
          <Navbar.Collapse id='nav-collapse'>
            <Link to='/create-account' className='nav-link'>
              Create Account
            </Link>
            <Link to='/login' className='nav-link'>
              Login
            </Link>
            <Link to='/deposit' className='nav-link'>
              Deposit
            </Link>
            <Link to='/withdraw' className='nav-link'>
              Withdraw
            </Link>
            <Link to='/balance' className='nav-link'>
              Balance
            </Link>
            <Link to='/all-data' className='nav-link'>
              All Data
            </Link>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MainNav
