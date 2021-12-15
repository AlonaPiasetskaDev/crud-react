import { Modal, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

const CreateProfileModal = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log("handle submit");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      id="createProfile"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter name" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="male"
                  name="gender"
                  type="radio"
                  id={`inline-radio-male`}
                />
                <Form.Check
                  inline
                  label="female"
                  name="gender"
                  type="radio"
                  id={`inline-radio-female`}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control required type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control required type="text" placeholder="Enter city" />
              <Form.Control.Feedback type="invalid">
                Required field! Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" id="saveBtn" onClick={handleSubmit}>
          <i className="bi bi-check2"></i>
        </Button>
        <Button variant="secondary" id="rejectBtn">
          <i className="bi bi-x"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProfileModal;
