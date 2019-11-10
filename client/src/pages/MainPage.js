import React from "react";
import { authService } from "../authService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";

class MainPage extends React.Component {
  render() {
    return (
      <Container>
        <Row className="my-4">
          <h2>Welcome to CourseStar!</h2>
        </Row>
        <Row>
          <CardDeck>
            <Card>
              <Card.Body>
                <Card.Title>Browse Courses</Card.Title>
                <Card.Text>
                  Check out the best courses we have to offer.
                </Card.Text>
                <Button href="/CourseBrowse" variant="primary">
                  Browse
                </Button>
              </Card.Body>
            </Card>
            {authService.loggedIn() ? (
              <Card>
                <Card.Body>
                  <Card.Title>Registered for class?</Card.Title>
                  <Card.Text>View your course information here.</Card.Text>
                  <Button href="/MyCourses" variant="primary">
                    My Courses
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>Have an account?</Card.Title>
                  <Card.Text>Log in below to check your courses!</Card.Text>
                  <Button href="/Login" variant="primary">
                    Login
                  </Button>
                </Card.Body>
              </Card>
            )}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

export default MainPage;
