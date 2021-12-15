import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
// import { useState } from "react";
import { useAuth } from "../context/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import adminAvatar from "../../img/adminAvatar.png";

const NavbarAdmin = () => {
  const { signed, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = (e) => navigate("logout");

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            src={adminAvatar}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="avatar"
            style={{ fontSize: "1.1rem" }}
          />{" "}
          <span style={{ marginLeft: ".8rem", fontSize: "1.1rem" }}>
            currentUser.name.toLowerCase()
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
              <Nav.Link>
                <Link className="nav-link" to="dashboard">
                  Dashboard <i className="bi bi-reception-3" width={"1em"}></i>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav-link" to="users">
                  Users <i className="bi bi-people-fill" width={"1em"}></i>
                </Link>
              </Nav.Link>
              <Nav.Link href="#" onClick={onLogout}>
                <Link to="#" className="nav-link">
                  Log out
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
