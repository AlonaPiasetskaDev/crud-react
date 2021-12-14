import { useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";

const validateSignUp = (data) => {
  const errors = [];
  console.log("data.signUsername", data.signUsername); // ^\\w[\\w.]{2,18}\\w$      /^\w[\w.]{2,18}\w$/
  console.log("data.signEmail", data.signEmail); // /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  console.log("data.signPassword", data.signPassword); // RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
  // console.log("data.signIsAdmin",data.signIsAdmin);
  if (
    data.signUsername === "" ||
    data.signEmail === "" ||
    data.signPassword === ""
  ) {
    let emptyField = "Please fill all the fields";
    errors.push(emptyField);
  }
  if (data.signUsername) {
    let username = data.signUsername;
    let re = /[a-zA-Z0-9]/g;
    if (new RegExp(re).test(username)) {
      console.log("username", true);
    } else {
      let invalidUsername =
        "Invalid value for username. It should contain only latin alphabet and numbers.";
      errors.push(invalidUsername);
    }
  }
  if (data.signEmail) {
    let email = data.signEmail;
    let re = /\S+@\S+\.\S+/;
    if (new RegExp(re).test(email)) {
      console.log("email", true);
    } else {
      let invalidEmail = "Invalid value for email. Example: example@mail.com";
      errors.push(invalidEmail);
    }
  }
  if (data.signPassword) {
    let password = data.signPassword;
    let re = /\S{6,14}/g;
    if (new RegExp(re).test(password)) {
      console.log("password", true);
    } else {
      let invalidPassword = "Invalid value for password. Length 6-14 chars.";
      errors.push(invalidPassword);
    }
  }

  if (errors.length > 0) {
    console.error(errors);
  }
};

const SignUpModal = (props) => {
  const { isOpen, onHide, handleLogin } = props;
  const [validated, setValidated] = useState(false);

  const [signUpData, setSignUpData] = useState({
    signUsername: "",
    signEmail: "",
    signPassword: "",
    signIsAdmin: false,
  });

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // e.preventDefault();
      // e.stopPropagation();
      console.log("setValidated(false)");
    }

    setValidated(true);
  };

  // const

  console.log("SignUpModal");
  return (
    <Modal {...props} fullscreen={true}>
      <Modal.Body>
        <Container className="mt-5 justify-content-center">
          <h2>Create your account</h2>
          <Container className="mt-5">
            <Form
              validated={validated}
              onSubmit={(e) => {
                e.handleSubmit();
                e.preventDefault();
                console.log("result", signUpData);
                validateSignUp(signUpData);
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
                  <Form.Control.Feedback type="invalid">
                    Invalid value for username. It should contain only latin
                    alphabet and numbers.
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Invalid value for email. Example: example@mail.com
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Invalid value for password. Length 6-14 chars.
                  </Form.Control.Feedback>
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
