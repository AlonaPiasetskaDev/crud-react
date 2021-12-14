import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import Profiles from "./Profiles";
import Dashboard from "./dashboard";
import Users from "./Users";
import SignUpModal from "./signUp";
import defaultAvatar from "./img/defaultAvatar.png";
import SignIn from "./signIn";

const NavBar = () => {
  const [isSignUpModalShow, setSignUpModalShow] = useState(false);
  const [modalSignInShow, setModalSignInShow] = useState(false);
  const { signed, currentUser, logout } = useAuth();

  const isAdmin = false;
  // currentUser.isAdmin ? true : false;
  console.log("currentUser", currentUser);
  // console.log("isAdmin", isAdmin);

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
              alt="avatar"
              style={{ fontSize: "1.1rem" }}
            />{" "}
            <span style={{ marginLeft: ".8rem", fontSize: "1.1rem" }}>
              {signed ? currentUser.name.toLowerCase() : "guest"}
            </span>
          </Navbar.Brand>
          <Nav>
            <Navbar.Collapse className="justify-content-end">
              {!signed ? (
                <Nav className="me-auto">
                  <Nav.Link style={{ borderRight: "1.5px solid white" }}>
                    <Link
                      className="nav-link"
                      to="/signin"
                      onClick={() => setModalSignInShow(true)}
                    >
                      SignIn
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      className="nav-link"
                      to="/signup"
                      onClick={() => setSignUpModalShow(true)}
                    >
                      Login
                    </Link>
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav className="me-auto">
                  {/* <Nav.Link>
                    <Link
                      className="nav-link"
                      to="/signin"
                      onClick={() => setModalSignInShow(true)}
                    >
                      SignIn
                    </Link>
                  </Nav.Link> */}

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
                  {isAdmin ? (
                    <Nav.Link>
                      <Link className="nav-link" to="/users">
                        Users{" "}
                        <i className="bi bi-people-fill" width={"1em"}></i>
                      </Link>
                    </Nav.Link>
                  ) : (
                    ""
                  )}

                  {signed ? (
                    <Nav.Link>
                      <Link
                        className="nav-link"
                        to="/logout"
                        onClick={() => logout()}
                      >
                        Log out
                      </Link>
                    </Nav.Link>
                  ) : (
                    <Nav.Link>
                      <Link
                        className="nav-link"
                        to="/signup"
                        onClick={() => setSignUpModalShow(true)}
                      >
                        Log in
                      </Link>
                    </Nav.Link>
                  )}
                </Nav>
              )}
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        {signed ? (
          <Routes>
            <Route path="/" />
            <Route path="/signin" />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {!currentUser.isAdmin || currentUser.isAdmin !== null ? (
              <Route path="/users" element={<Users />} />
            ) : (
              ""
            )}

            <Route path="/signup" />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" />
            <Route path="/signin" />
            <Route path="/signup" />
          </Routes>
        )}
      </Container>
      <Container className="modals">
        <SignUpModal
          show={isSignUpModalShow}
          onHide={() => setSignUpModalShow(false)}
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
