import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

function NavComponent() {
  return (
    <Navbar expand='lg' variant='dark' bg='dark'>
      <Container>
        <Nav>
          <NavLink to='/' className='navbar-brand' title='Bank Homepage'>
            BadBank
          </NavLink>
        </Nav>
        <Nav>
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
          <NavLink
            to='/all-data'
            className='nav-link'
            title='See data for all user accounts'
          >
            All Data
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavComponent
