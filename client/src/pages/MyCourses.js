import React from "react";
import { withRouter, Link } from "react-router-dom";
import { authService } from "../authService";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class MyCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    var userid = authService.getUser().uid;

    this.getSelectedCourses(userid)
      .then(res => {
        this.setState({ courses: res });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server.
  getSelectedCourses = async (uid) => {
    const response = await fetch('/students/' + uid + '/courses');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleClick(c_code) {
    const code = c_code;
    localStorage.setItem("course_code", JSON.stringify(code));
  }

  render() {

    const defaultCourses = [
      {"cid":"CS2222","yearsem":"2019-01","name":"Database Systems","uid":"A0000031"},
      {"cid":"CS3333","yearsem":"2019-01","name":"Introduction to Artificial Intelligence","uid":"A0000032"},
      {"cid":"CS4444","yearsem":"2019-01","name":"Discrete Structures","uid":"A0000032"}
    ];

    return (
      <Container>
        <Row className="mt-4">
          <Col className="ml-auto">
            <h2>My Courses</h2>
          </Col>
          <Col xs="2" className="mr-auto">
            <Button href="/CourseBrowse" variant="primary">Browse Courses</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <hr />
          <CardDeck>
            {this.state.courses.map((course) => (
              <Card style={{ border:'0px' }}>
                <Button href="/Course"
                  onClick={() => this.handleClick(course.cid)}
                  variant="outline-success"
                >
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{course.cid}</Card.Subtitle>
                  <Card.Text>
                    Professor {course.uid}
                  </Card.Text>
                </Button>
              </Card>
            ))}
          </CardDeck>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(MyCourses);
