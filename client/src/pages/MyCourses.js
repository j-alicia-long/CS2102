import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class MyCourses extends React.Component {

  render() {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <h2>My Courses</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
          <CardDeck>
            <Card style={{ width: '18rem' }}>
              <Button href="/Course" variant="outline-success">
                <Card.Title>Databases</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">CS2102</Card.Subtitle>
                <Card.Text>
                  Professor Oak
                </Card.Text>
              </Button>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Button href="/Course" variant="outline-success">
                <Card.Title>Operating Systems</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">CS2106</Card.Subtitle>
                <Card.Text>
                  Professor Maple
                </Card.Text>
              </Button>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Button href="/Course" variant="outline-success">
                <Card.Title>Interaction Design</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">CS3240</Card.Subtitle>
                <Card.Text>
                  Professor Willow
                </Card.Text>
              </Button>
            </Card>
          </CardDeck>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyCourses;

// <Card style={{ width: '18rem' }}>
//   <Card.Body>
//     <Card.Title>Databases</Card.Title>
//     <Card.Subtitle className="mb-2 text-muted">CS2102</Card.Subtitle>
//     <Card.Text>
//       Professor
//     </Card.Text>
//   </Card.Body>
// </Card>
