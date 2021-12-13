import { Container, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";

const SignIn = (props) => {
  console.log("SignIn");
  const [result, setResult] = useState({ resEmail: "", resPassword: "" });

  return (
    <Modal {...props} fullscreen={true}>
      <Modal.Body>
        <Container className="mt-5 justify-content-center">
          <h2>Sign In:</h2>
          <Container className="mt-5">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("result", result);
              }}
            >
              <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setResult((prevState) => ({
                        ...prevState,
                        resEmail: e.target.value,
                      }));
                      console.log("result", result);
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
                        resPassword: e.target.value,
                      }));
                      console.log("result", result);
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
