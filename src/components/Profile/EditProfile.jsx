import { Modal, Container, Form, Button } from "react-bootstrap";
import { useState, useRef } from "react";

const EditProfileModal = (props) => {
  const { profile, onSave, show, onHide } = props;
  const [changedProfile, setChangedProfile] = useState();

  let editProfile = profile["profile"];

  let tmpDay = new Date(editProfile.birthdate);
  const doubleSignDate = (date) => {
    return +date > 10 ? date : `0${date}`;
  };
  let bday = `${tmpDay.getFullYear()}-${doubleSignDate(
    tmpDay.getMonth()
  )}-${doubleSignDate(tmpDay.getDay())}`;

  const formEl = useRef();
  const prevName = useRef(editProfile.name);
  const prevBday = useRef(bday);
  const prevCity = useRef(editProfile.city);

  const handleSubmit = () => {
    console.log("edit profile submit");
  };

  return (
    <Modal
      {...props}
      id="editProfile"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit} ref={formEl}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={prevName.current} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  defaultChecked={true}
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
              <Form.Control
                type="date"
                defaultValue={prevBday.current}
                onChange={(e) => {}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                defaultValue={prevCity.current ? prevCity.current : "Kyiv"}
              />
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

export default EditProfileModal;
