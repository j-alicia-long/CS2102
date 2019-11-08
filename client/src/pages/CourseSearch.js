import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Form, FormControl, Button } from "react-bootstrap";

class CourseSearch extends React.Component {
  render() {
    return (
      <Container className="mt-4">
        <Card>
          <Form>
            <Form.Group as={Row} controlId="searchKeyword">
              <Form.Label column sm="3">
                <strong>Search keyword</strong>
              </Form.Label>
              <Col sm="9">
                <FormControl
                  type="text"
                  placeholder="User ID, Course ID"
                  className="mr-sm-2"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="searchOptions">
              <Form.Label column sm="3">
                <strong>Search In</strong>
              </Form.Label>
              <Col sm="9">
                <div key={`checkbox-options`} className="mb-3">
                  {["Professors", "Courses"].map(table => (
                    <Form.Check
                      inline
                      label={table}
                      type="checkbox"
                      defaultChecked="true"
                      id={`checkbox-${table}`}
                    />
                  ))}
                </div>
              </Col>
            </Form.Group>
            <Button variant="outline-success">Search</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default CourseSearch;
