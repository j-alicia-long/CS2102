import React from "react";
import { withRouter } from "react-router-dom";

import { authService } from "../authService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Nav } from "react-bootstrap";

class MyCourses extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   this.verifyUser()
  //     .then(res => {
  //       console.log(res);
  //       if (res.status !== 200) {
  //         console.log(" up");
  //       } else {
  //         console.log("user logged into MyCourses");
  //         // console.log("user: ", res.json());
  //         res.json().then(user => {
  //           console.log("user: ", user.username);
  //           authService.login(user.username);
  //         });
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  // verifyUser = async () => {
//   const response = await fetch("/auth[/verify]");
  //   // const user = await response.json();
  //   return response;
  // };

  render() {
    return (
      <Container>
        <Row className="mt-4 justify-content-md-center">
          <Col md="6">
            <hr />
            <h2>My Courses</h2>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    CS2102 - Databases
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    CS2106 - Operating Systems
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(MyCourses);
