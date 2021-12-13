import { Container, Form, Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";

import { AppContext } from "../context/AppContext";

const SignIn = (props) => {
  const [result, setResult] = useState({ email: "", password: "" });
  const { handleLogin } = useContext(AppContext);

  const loginUser = async (event) => {
    event.preventDefault();
    const token = await handleLogin(result.email, result.password);
    if (token) {
      window.localStorage.setItem("token", token);
    }
    props.onHide();
  };

  return (
    <Modal {...props} fullscreen={true}>
      <Modal.Body>
        <Container className="mt-5 justify-content-center">
          <h2>Sign In:</h2>
          <Container className="mt-5">
            <Form onSubmit={loginUser}>
              <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setResult((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }));
                    }}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setResult((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }));
                    }}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
              </Container>

              <Button className="mt-5" variant="light" type="submit">
                Sign In
              </Button>
            </Form>
          </Container>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
