import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavItem from 'react-bootstrap/esm/NavItem'
import { NavLink } from 'react-router-dom'
import { useAppContext } from './AppContext'

function NavComponent() {
  const { user, setUser } = useAppContext()

  function handleLogout() {
    console.log('user logged out')
  }

  return (
    <Navbar expand='lg' variant='dark' bg='dark'>
      <Container>
        <Nav>
          <NavLink to='/' className='navbar-brand' title='Bank Homepage'>
            BadBank
          </NavLink>
        </Nav>
        <Nav>
          <NavLink to='/login' className='nav-link' title='Log In'>
            Login
          </NavLink>
          {user ? (
            <NavItem>
              <button className='nav-link' onClick={handleLogout}>
                Logout
              </button>
            </NavItem>
          ) : (
            ''
          )}
          <NavLink
            to='/create-account'
            className='nav-link'
            title='Create new accounts'
          >
            Create Account
          </NavLink>
          <NavLink
            to='/deposit'
            className='nav-link'
            title='Deposit money into an account'
          >
            Deposit
          </NavLink>
          <NavLink
            to='/withdraw'
            className='nav-link'
            title='Withdraw money from an account'
          >
            Withdraw
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavComponent
