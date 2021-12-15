import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Users = (props) => {
  const { signed, currentUser } = useAuth();
  const navigate = useNavigate();
  <h1>Users:</h1>;
  console.log(currentUser);
  return (
    <Container className="mt-5">
      <h2>Users:</h2>
      <Container className="mt-5">
        <Card
          key={1}
          style={{ width: "18rem" }}
          className="mb-2"
          onClick={() => navigate("/profiles")}
        >
          <Card.Body>
            <Card.Title>{currentUser.name}</Card.Title>
            <Card.Text>
              <p>{currentUser.email}</p>
              <p>1 profile</p>
              {/* {userProfiles.length} {userProfiles.length === 1 ? "profile" : "profiles"} */}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
  // });
};

export default Users;
