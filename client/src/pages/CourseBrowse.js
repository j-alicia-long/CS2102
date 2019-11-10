import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class CourseBrowse extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.getCourses()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server.
  getCourses = async () => {
    const response = await fetch('/courses/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleClick(c_code) {
    const code = c_code;
    localStorage.setItem('course_code', JSON.stringify(code));
  }

  render() {
    return (
      <Container>
        <Row className="mt-4 justify-content-md-center">
          <Col md="8">
            <h2>Browse Courses</h2>
            <hr />
            <Accordion>
              {this.state.data.map((course, i) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={i}>
                    <h6>
                      {course.cid}: {course.name}
                    </h6>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i}>
                    <Card.Body>
                      <p>Semester: {course.yearsem}</p>
                      <p>Professor ID: {course.uid}</p>
                      <Link to="/Course" onClick={() => this.handleClick(course.cid)}>
                        Go to course overview
                      </Link>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CourseBrowse;

// For debugging purposes
//
// <h1>USER DATABASE</h1>
// <div className="App-intro">
//   {this.state.data.map((user, i) => (
//     <div key={`${i}-user`}>
//       <span key={`${i}-name`}>Name: {user.name} | </span>
//       <span key={`${i}-uid`}>uid: {user.uid} | </span>
//       <span key={`${i}-pass`}>pass: {user.pass} | </span>
//       <span key={`${i}-faculty`}>faculty: {user.faculty}</span>
//     </div>
//   ))}
// </div>
