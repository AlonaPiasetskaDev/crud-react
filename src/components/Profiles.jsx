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
import { useProfilesContext, ProfilesProvider } from "../context/profiles";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { useUsersContext } from "../context/users";

const CreateProfileModal = (props) => {
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
  const [createProfileModal, setCreateProfileModalShow] = useState(false);
  const { signed, currentUser } = useAuth();
  const { updateUser } = useUsersContext();
  const { fetchProfiles } = useProfilesContext();

  console.log("currentUser", currentUser);
  console.log("fetchProfiles", fetchProfiles)

  return (
    <Container className="profiles">
      <ProfilesProvider>
        {signed ? (
          <Container className="mt-5">
            <UserCard user={currentUser} onSave={updateUser} />

            <Col id="profiles" className="mt-5">
              <h2>Profiles:</h2>
              {(profiles) => (
                <Row className="mt-5">
                  <Col>
                    <Card style={{ width: "320px" }}>
                      <Card.Body>
                        {/* <Card.Title>{profile.name}</Card.Title> */}
                        <Card.Title>name</Card.Title>
                        <Card.Text>
                          {/* <p>{profile.gender ? profile.gender : ""}</p>  */}
                          <p>birthday</p>
                          <p>city</p>
                          <p>gender</p>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          variant="outline-primary"
                          style={{ width: "120px" }}
                          onClick={() => {}}
                        >
                          {/* #624AF2 */}
                          Edit <i className="bi bi-pencil" width={"1em"}></i>
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          style={{ width: "120px" }}
                        >
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
              )}
              {/* <div>{profiles}</div> */}
            </Col>
          </Container>
        ) : (
          ""
        )}

        <CreateProfileModal
          show={createProfileModal}
          onHide={() => setCreateProfileModalShow(false)}
        />
      </ProfilesProvider>
    </Container>
  );
};

export default Profiles;

/*
// profiles.forEach((profile) => 
                //   <Row className="mt-5">
                //     <Col>
                //       <Card style={{ width: "320px" }}>
                //         <Card.Body>
                //           <Card.Title>{profile.name}</Card.Title>
                //           <Card.Text>
                //             {/* <p>{profile.gender ? profile.gender : ""}</p> */
//             <p>{profile.birthday ? profile.birthday : ""}</p>
//             <p>{profile.city ? profile.city : ""}</p>
//           </Card.Text>
//         </Card.Body>
//         <Card.Footer>
//           <Button
//             variant="outline-primary"
//             style={{ width: "120px" }}
//             onClick={() => {}}
//           >
//             {/* #624AF2 */}
//             Edit <i className="bi bi-pencil" width={"1em"}></i>
//           </Button>
//           <Button
//             variant="outline-danger"
//             style={{ width: "120px" }}
//           >
//             {/* "#EB0055" */}
//             Delete <i className="bi bi-trash" width={"1em"}></i>
//           </Button>
//         </Card.Footer>
//       </Card>
//     </Col>
//     <Col>
//       <Card
//         style={{ width: "18rem" }}
//         onClick={() => setCreateProfileModalShow(true)}
//       >
//         <Card.Body>
//           <Card.Text>
//             <Button className="mb-3 mt-3" variant="link">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="70"
//                 height="70"
//                 fill="#4E4B66"
//                 class="bi bi-plus-circle"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
//               </svg>
//             </Button>

//             <p>Create new profile</p>
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Col>
//   </Row>;
// });

// {/* </ProfilesProvider.Consumer> */}
