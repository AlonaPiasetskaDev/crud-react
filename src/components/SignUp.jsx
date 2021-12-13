import { useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";

const SignUpModal = (props) => {
  const { isOpen, onHide, handleLogin } = props;
  const [signUpData, setSignUpData] = useState({
    signUsername: "",
    signEmail: "",
    signPassword: "",
    signIsAdmin: false,
  });

  console.log("SignUpModal");
  return (
    <Modal {...props} fullscreen={true}>
      <Modal.Body>
        <Container className="mt-5 justify-content-center">
          <h2>Create your account</h2>
          <Container className="mt-5">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("result", signUpData);
              }}
            >
              <Container>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => {
                      setSignUpData((prevState) => ({
                        ...prevState,
                        signUsername: e.target.value,
                      }));
                      console.log("result", signUpData);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setSignUpData((prevState) => ({
                        ...prevState,
                        signEmail: e.target.value,
                      }));
                      console.log("result", signUpData);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setSignUpData((prevState) => ({
                        ...prevState,
                        signPassword: e.target.value,
                      }));
                      console.log("result", signUpData);
                    }}
                  />
                </Form.Group>
              </Container>
              <Form.Group className="mb-3" controlId="formIsAdmin">
                <Form.Check
                  type="checkbox"
                  label="is admin"
                  onChange={(e) => {
                    setSignUpData((prevState) => ({
                      ...prevState,
                      signIsAdmin: !prevState.signIsAdmin,
                    }));

                    console.log("result", signUpData);
                  }}
                />
              </Form.Group>
              <Button className="mt-5" variant="light" type="submit">
                Sign Up
              </Button>
            </Form>
          </Container>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
