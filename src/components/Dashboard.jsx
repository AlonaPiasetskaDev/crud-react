import { Row, Col, Container, Card } from "react-bootstrap";


const Dashboard = (props) => {
  console.log("Dashboard");


  return (
    <Container>
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
                <h1>18</h1>
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
                <h1>25</h1>
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
  );
};

export default Dashboard;
