import { Card, Button, Container, Col, Row } from "react-bootstrap";

import { useAuth } from "../context/auth";
import { useProfilesContext, ProfilesProvider } from "../context/profiles";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { useUsersContext } from "../context/users";
import  ProfileCard  from "./Profile/ProfileCard";
import CreateProfileModal from "./Profile/CreateProfile";

const Profiles = () => {
  const [createProfileModal, setCreateProfileModalShow] = useState(false);

  const { signed, currentUser } = useAuth();
  const { updateUser } = useUsersContext();
  const { fetchProfiles, profiles } = useProfilesContext();

  // console.log(profiles);

  return (
    <Container className="profiles">
      {signed && (
        <Container className="mt-5">
          <UserCard user={currentUser} onSave={updateUser} />

          <Col id="profiles" className="mt-5">
            <h2>Profiles:</h2>

            <Row className="mt-5">
              {profiles &&
                profiles.map((p, index) => {
                  console.log("profiles p", p);
                  return <ProfileCard key={index} profile={p} />;
                })}
              <Col>
                <Card
                  style={{ width: "18rem", minHeight: "241px" }}
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
      )}

      <CreateProfileModal
        show={createProfileModal}
        onHide={() => setCreateProfileModalShow(false)}
      />
    </Container>
  );
};

export default Profiles;
