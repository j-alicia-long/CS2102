import React from "react";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class CourseBrowse extends React.Component {
  handleClick(c_code) {
    const code = c_code;
    localStorage.setItem("course_code", JSON.stringify(code));
  }

  render() {
    return (
      <Container>
        <Row className="mt-4 justify-content-md-center">
          <Col md="6">
            <h2>Browse Courses</h2>
            <hr />

            <Accordion>
              <Card>
                <Card.Header>
                  <Link to="/Course">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="1"
                      onClick={() => this.handleClick("EE3333")}
                    >
                      EE3333 - Systems and Signals
                    </Accordion.Toggle>
                  </Link>
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Link to="/Course">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="1"
                      onClick={() => this.handleClick("CS2222")}
                    >
                      CS2222 - Database Systems
                    </Accordion.Toggle>
                  </Link>
                </Card.Header>
              </Card>
            </Accordion>

            <Link to="/Course">Go to course overview</Link>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default CourseBrowse;
