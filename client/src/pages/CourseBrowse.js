import React from "react";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class CourseBrowse extends React.Component {

  render() {
    return (
      <Container>
        <Row className="mt-4 justify-content-md-center">
          <Col md="6">
            <h2>Browse Courses</h2>
            <hr />
            <Link to="/Course">Go to course overview</Link>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default CourseBrowse;
