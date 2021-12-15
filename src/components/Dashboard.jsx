import { Row, Col, Container, Card } from "react-bootstrap";

const Dashboard = (props) => {
  console.log("Dashboard");

  const stats = { users: 5, profiles: 10 };

  return (
    <>
      <Container className="mt-5">
        <Row className="mb-5">
          <h2>Dashboard:</h2>
        </Row>
        <Row>
          <Col>
            <Card
              bg="light"
              key="users"
              text="dark"
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>Users: </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h1>{stats.users}</h1>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="light"
              key="profiles"
              text="dark"
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>Profiles </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h1>{stats.profiles}</h1>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="light"
              key="profilesOver"
              text="dark"
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>Profiles over 18 years old: </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h1>11</h1>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
