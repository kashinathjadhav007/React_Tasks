import faker from "@faker-js/faker";
import Slider from "../Components/Slider";
import { Button } from "@mui/material";
import { Nav, Navbar, Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  function redirectHandler() {
    navigate("/login");
  }
  return (
    <div className="mainclass">
      <Navbar bg="primary" style={{ float: "right" }}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/reset">Reset Password</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Slider />
      <div className="register-box">
        <p style={{ paddingLeft: "200px" }}>
          Already have an account? <a onClick={redirectHandler}>Login</a>
        </p>
        <h2>Register</h2>
        <form>
          <div className="user-box">
            <input type="text" placeholder={faker.name.firstName()} />
            <label>FirstName</label>
          </div>
          <div className="user-box">
            <input type="text" placeholder={faker.name.lastName()} />
            <label>LastName</label>
          </div>
          <div className="user-box">
            <input type="text" placeholder={faker.internet.email()} />
            <label>email address</label>
          </div>
          <div className="user-box">
            <input type="text" placeholder="set user name" />
            <label>Set User name</label>
          </div>
          <div className="user-box">
            <input type="text" placeholder="set pswd" />
            <label>Password</label>
          </div>
          <div style={{ paddingLeft: "150px", paddingTop: "20px" }}>
            <Button
              variant="contained"
              onClick={redirectHandler}
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              Submit
            </Button>
          </div>
          {/* <a href="#" onClick={redirectHandler()}>
              Register
            </a> */}
        </form>
      </div>
    </div>
  );
};
export default Register;
