import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Form, FormControl, Button} from 'react-bootstrap'


class CourseSearch extends React.Component {

  render() {
    return (
      <Container className="mt-4">
          <Form>
            <Form.Group as={Row} controlId="searchKeyword">
              <Form.Label column sm="2">Search keyword</Form.Label>
              <Col sm="9">
                <FormControl type="text" placeholder="User ID, Course ID" className="mr-sm-2" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchOptions">
              <Form.Label column sm="2">Search In</Form.Label>
              <Col sm="9">
                <div key={`checkbox-options`} className="mb-3">
                  {['Users', 'Courses'].map(table => (
                      <Form.Check inline label={table} type="checkbox" defaultChecked="true" id={`checkbox-${table}`} />
                  ))}
                </div>
              </Col>
            </Form.Group>
            <Button variant="outline-success">Search</Button>
          </Form>
      </Container>
    );
  }
}

export default CourseSearch;
