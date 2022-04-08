import { Nav, Navbar, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Slider from "../Components/Slider";

const Reset_Password = () => {
  const navigate = useNavigate();
  function redirectHandler() {
    navigate("/login");
  }
  return (
    <>
      <Navbar bg="primary" style={{ float: "right" }}>
        <Container>
          <Nav className="me-auto" style={{ float: "right" }}>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="mainclass">
        <Slider />

        <div className="login-box">
          <h2>Reset password</h2>
          <form>
            <div className="user-box">
              <input type="passwordt" placeholder="****" />
              <label>Old password</label>
            </div>
            <div className="user-box">
              <input type="password" placeholder="****" />
              <label>New password</label>
            </div>
            <div className="user-box">
              <input type="password" placeholder="****" />
              <label>Confirm password</label>
            </div>
            <div style={{ paddingLeft: "100px", paddingTop: "20px" }}>
              <Button
                variant="contained"
                onClick={redirectHandler}
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                Reset Passwrd
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Reset_Password;
