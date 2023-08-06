import { Container, Nav, Navbar } from 'react-bootstrap'

function MainNav() {
  return (
    <Navbar>
      <Container>
        <Nav>
          <Navbar.Brand href='/'>Badbank</Navbar.Brand>
          <Nav.Link href='/create-account'>Create Account</Nav.Link>
          <Nav.Link href='/login'>Login</Nav.Link>
          <Nav.Link href='/deposit'>Deposit</Nav.Link>
          <Nav.Link href='/withdraw'>Withdraw</Nav.Link>
          <Nav.Link href='/balance'>Balance</Nav.Link>
          <Nav.Link href='/all-data'>All Data</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MainNav
