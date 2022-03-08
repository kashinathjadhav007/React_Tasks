import { Nav, Navbar, Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/cards">Cards</Nav.Link>
          <Nav.Link href="/faker">Faker</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Navigation;
