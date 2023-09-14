import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigationbar() {
  return (
    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">JOKER</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="addcandidate">Add Candidate</Nav.Link>
            <Nav.Link href="/pickwinner">Pick winner</Nav.Link>
            <Nav.Link href="/winners">Winners</Nav.Link>
          </Nav>
        </Container>
      </Navbar>)
  }

  export default Navigationbar
      