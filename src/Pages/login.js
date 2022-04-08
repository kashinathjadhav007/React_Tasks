import faker from "@faker-js/faker";
import { Button } from "@mui/material";
import Slider from "../Components/Slider";
import { Nav, Navbar, Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  function redirectHandler() {
    navigate("/register");
  }
  function redirectHandler1() {
    navigate("/reset");
  }
  function redirectHandler2() {
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
      <div className="login-box">
        <p style={{ paddingLeft: "200px" }}>
          Don’t have an account?{" "}
          <a onDoubleClick={redirectHandler}>Get started</a>
        </p>
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" placeholder={faker.internet.userName()} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" placeholder="****" />
            <label>Password</label>
          </div>
          <div
            style={{ display: "flex", paddingTop: "30px", paddingLeft: "70px" }}
          >
            <div style={{ paddingRight: "20px", PaddingLeft: "40px" }}>
              <Button variant="contained" onClick={redirectHandler}>
                Submit
              </Button>
            </div>
            <div style={{ paddingLeft: "40px" }}>
              <Button variant="contained" onClick={redirectHandler1}>
                Forget password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
