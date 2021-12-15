import React from "react";

import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Tabs defaultActiveKey="signin" className="mb-3" fill>
              <Tab eventKey="signin" title="SignIn">
                <Card body>
                  <SignIn />
                </Card>
              </Tab>
              <Tab eventKey="signup" title="SignUp">
                <Card body>
                  <SignUp />
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthPage;
