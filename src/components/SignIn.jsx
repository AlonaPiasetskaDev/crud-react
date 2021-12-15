import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const [result, setResult] = useState({ email: "", password: "" });
  const { signed, login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    await login({ email: result.email, password: result.password });
    navigate("/");
  }

  return (
    <Container
      className="mt-5 justify-content-center"
      style={{ width: "400px" }}
    >
      <h2>Sign In:</h2>
      <Container className="mt-5">
        <Form onSubmit={handleLogin}>
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
  );
};

export default SignIn;
