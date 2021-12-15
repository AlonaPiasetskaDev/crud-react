import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import defaultAvatar from "./img/defaultAvatar.png";

const NavBar = () => {
  const { signed, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => navigate("logout");

  return (
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
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="nav-link" to="profiles">
                  Profiles{" "}
                  <i className="bi bi-person-rolodex" width={"1em"}></i>
                </Link>
              </Nav.Link>

              {currentUser.isAdmin && (
                <>
                  <Nav.Link>
                    <Link className="nav-link" to="dashboard">
                      Dashboard{" "}
                      <i className="bi bi-reception-3" width={"1em"}></i>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="users">
                      Users <i className="bi bi-people-fill" width={"1em"}></i>
                    </Link>
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="#"  onClick={onLogout}>
                <Link to="#" className="nav-link">Log out</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
