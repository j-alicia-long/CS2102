import React from "react";

import LoginForm from "./LoginForm";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class LoginPage extends React.Component {
  render() {
    return (
      <Container>
        <Row className="py-4">
          <Col>
            <h2>Login to your account</h2>
            <LoginForm></LoginForm>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;
