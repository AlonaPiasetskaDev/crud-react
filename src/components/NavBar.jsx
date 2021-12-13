import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { useState } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import Profiles from "./Profiles";
import Dashboard from "./Dashboard";
import Users from "./Users";
import SignUpModal from "./SignUp";
import defaultAvatar from "./img/defaultAvatar.png";
import SignIn from "./SignIn";

const NavBar = () => {
  const [modalSignUpShow, setModalSignUpShow] = useState(false);
  const [modalSignInShow, setModalSignInShow] = useState(false);

  console.log("NavBar");
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src={defaultAvatar}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link
                    className="nav-link"
                    to="/signin"
                    onClick={() => setModalSignInShow(true)}
                  >
                    Redirect
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/profiles">
                    Profiles{" "}
                    <i className="bi bi-person-rolodex" width={"1em"}></i>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/dashboard">
                    Dashboard{" "}
                    <i className="bi bi-reception-3" width={"1em"}></i>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/users">
                    Users <i className="bi bi-people-fill" width={"1em"}></i>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="nav-link"
                    to="/signup"
                    onClick={() => setModalSignUpShow(true)}
                  >
                    Login
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/signin" />} /> */}
          <Route path="/" />
          <Route path="/signin" />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signup" />
        </Routes>
      </Container>
      <Container className="modals">
        <SignUpModal
          show={modalSignUpShow}
          onHide={() => setModalSignUpShow(false)}
        />
        <SignIn
          show={modalSignInShow}
          onHide={() => setModalSignInShow(false)}
        />
      </Container>
    </Router>
  );
};

export default NavBar;
