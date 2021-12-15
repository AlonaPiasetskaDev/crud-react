import { Col, Card, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import EditProfileModal from "./EditProfile";

const ProfileCard = (profile, key) => {
  const birthday = new Date(profile["profile"].birthdate);
  const [editProfileModal, setEditProfileModalShow] = useState(false);
  const displayDate = (num) => {
    return num < 10 ? `0${num}` : num;
  };
  return (
    <>
      <Col key={key}>
        <Card style={{ width: "320px", minHeight: "241px" }}>
          <Card.Body>
            <Card.Title>{profile["profile"].name}</Card.Title>
            <Card.Text>
              <p>
                {profile["profile"].gender ? profile["profile"].gender : "male"}
              </p>
              <p>
                {displayDate(birthday.getDay())}.
                {displayDate(birthday.getMonth())}.{birthday.getFullYear()}
              </p>
              <p>
                {profile["profile"].city ? profile["profile"].city : "Kyiv"}
              </p>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-primary"
              style={{ width: "120px" }}
              onClick={() => setEditProfileModalShow(true)}
            >
              Edit <i className="bi bi-pencil" width={"1em"}></i>
            </Button>{" "}
            <Button variant="outline-danger" style={{ width: "120px" }}>
              Delete <i className="bi bi-trash" width={"1em"}></i>
            </Button>
          </Card.Footer>
        </Card>
      </Col>
      <EditProfileModal
        profile={profile}
        show={editProfileModal}
        onHide={() => setEditProfileModalShow(false)}
      />
    </>
  );
};

export default ProfileCard;
