import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

function NavComponent() {
  return (
    <Navbar expand='lg'>
      <Container>
        <Nav>
          <NavLink to='/' className='navbar-brand'>
            BadBank
          </NavLink>
          <Navbar.Toggle aria-controls='nav-collapse' />
          <Navbar.Collapse id='nav-collapse'>
            <NavLink to='/create-account' className='nav-link'>
              Create Account
            </NavLink>
            <NavLink to='/deposit' className='nav-link'>
              Deposit
            </NavLink>
            <NavLink to='/withdraw' className='nav-link'>
              Withdraw
            </NavLink>
            <NavLink to='/all-data' className='nav-link'>
              All Data
            </NavLink>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavComponent
