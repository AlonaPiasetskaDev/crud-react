import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Users = (props) => {
  const { signed, currentUser } = useAuth();
  const navigate = useNavigate();
  <h1>Users:</h1>;

  return (
    <Container>
      <h2>Users:</h2>
      <Container className="mt-5">
        <Card
          key={1}
          style={{ width: "18rem" }}
          className="mb-2"
          onClick={() => navigate("/profiles")}
        >
          <Card.Body>
            <Card.Title>Username</Card.Title>
            <Card.Text>
              <p>Email</p>
              <p>profile count</p>
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
