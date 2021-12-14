import {
  Card,
  Button,
  Container,
  Col,
  Row,
  Modal,
  Form,
} from "react-bootstrap";

import { useAuth } from "../context/auth";

import { useState } from "react";

const EditUser = (props) => {
  const { signed, currentUser } = useAuth();

  return (
    <Modal
      {...props}
      id="editUser"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" defaultValue={currentUser.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={currentUser.email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIsAdmin">
            <Form.Check
              type="checkbox"
              label="is admin"
              defaultChecked={currentUser.isAdmin ? true : false}
              // defaultValue={currentUser.isAdmin}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" id="saveBtn">
          <i className="bi bi-check2"></i>
        </Button>
        <Button variant="secondary" id="rejectBtn">
          <i className="bi bi-x"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditProfile = (props) => {
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
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="male"
                  name="male"
                  type="radio"
                  id={`inline-radio-male`}
                />
                <Form.Check
                  inline
                  label="female"
                  name="female"
                  type="radio"
                  id={`inline-radio-female`}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" id="saveBtn">
          <i className="bi bi-check2"></i>
        </Button>
        <Button variant="secondary" id="rejectBtn">
          <i className="bi bi-x"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CreateProfile = (props) => {
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
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="male"
                  name="male"
                  type="radio"
                  id={`inline-radio-male`}
                />
                <Form.Check
                  inline
                  label="female"
                  name="female"
                  type="radio"
                  id={`inline-radio-female`}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" id="saveBtn">
          <i className="bi bi-check2"></i>
        </Button>
        <Button variant="secondary" id="rejectBtn">
          <i className="bi bi-x"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Profiles = () => {
  const [userModalShow, setUserModalShow] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [createProfileModal, setCreateProfileModalShow] = useState(false);
  const { signed, currentUser } = useAuth();
  console.log(currentUser);

  console.log("profiles");
  //
  let profiles;
  fetch(`http://localhost:4000/${currentUser.id}/profiles/`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      profiles = data;
    });
  console.log(profiles);

  return (
    <Container className="profiles">
      {signed ? (
        <Container>
          <Row>
            <Col className="profile" md={{ span: 6, offset: 3 }}>
              <h1>{currentUser.name.toLowerCase()}</h1>
            </Col>
            <Col className="profile" md={{ span: 6, offset: 3 }}>
              <h3>{currentUser.email.toLowerCase()}</h3>
            </Col>
            <Col className="profile" md={{ span: 6, offset: 3 }}>
              <p> {currentUser.isAdmin ? "admin" : "user"}</p>
            </Col>
            <Col className="profile" md={{ span: 6, offset: 3 }}>
              <Button
                className="btn-sm"
                variant="link"
                id="edit"
                onClick={() => setUserModalShow(true)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button className="btn-sm" variant="link" id="delete">
                <i className="bi bi-trash"></i>
              </Button>
            </Col>
          </Row>

          <Col id="profiles" className="mt-5">
            <h2>Profiles:</h2>

            <Row className="mt-5">
              <Col>
                <Card style={{ width: "320px" }}>
                  <Card.Body>
                    <Card.Title>profile name</Card.Title>
                    <Card.Text>
                      <p>gender</p>
                      <p>birthday</p>
                      {/* {profile.birthday !== "null" && <h2>profile.birthday</h2>} */}
                      <p>city</p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="outline-primary"
                      style={{ width: "120px" }}
                      onClick={() => setProfileModalShow(true)}
                    >
                      {/* #624AF2 */}
                      Edit <i className="bi bi-pencil" width={"1em"}></i>
                    </Button>
                    <Button variant="outline-danger" style={{ width: "120px" }}>
                      {/* "#EB0055" */}
                      Delete <i className="bi bi-trash" width={"1em"}></i>
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{ width: "18rem" }}
                  onClick={() => setCreateProfileModalShow(true)}
                >
                  <Card.Body>
                    <Card.Text>
                      <Button className="mb-3 mt-3" variant="link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="70"
                          height="70"
                          fill="#4E4B66"
                          class="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                      </Button>

                      <p>Create new profile</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Container>
      ) : (
        ""
      )}
      <EditUser show={userModalShow} onHide={() => setUserModalShow(false)} />
      <EditProfile
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
      />
      {/* createProfileModal, setCreateProfileModalShow */}
      <CreateProfile
        show={createProfileModal}
        onHide={() => setCreateProfileModalShow(false)}
      />
    </Container>
  );

  // profiles.forEach((profile) => {
  //   <Card style={{ width: "18rem" }}>
  //     <Card.Body>
  //       <Card.Title>profile name</Card.Title>
  //       <Card.Text>
  //         <h2>{profile.gender}</h2>
  //         {profile.birthday !== "null" && <h2>profile.birthday</h2>}
  //         <h2>{profile.city}</h2>
  //       </Card.Text>
  //     </Card.Body>
  //     <Card.Footer>
  //       <Button variant="primary">Edit</Button>
  //       <Button variant="danger">Delete</Button>
  //     </Card.Footer>
  //   </Card>;
  // });
};

export default Profiles;
