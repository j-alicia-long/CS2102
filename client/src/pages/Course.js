import React from 'react';
import '../App.css';
import CourseNavBar from './CourseNavBar';

import { authService } from '../authService';
import { Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Course extends React.Component {
  state = {
    login: false,
    course_details: [],
    is_a_facil: false,
    enrolment: []
  };

  componentDidMount() {
    this.fetchCurrentCourse()
      .then(res => {
        this.setState({ course_details: res });
      })
      .catch(err => console.log(err));
    this.checkEnrolStatus()
      .then(res => {
        this.setState({ enrolment: res });
      })
      .catch(err => console.log(err));

    this.checkIfFacilitator()
      .then(res => {
        this.setState({ is_a_facil: res.length ? true : false });
      })
      .catch(err => console.log(err));
  }

  fetchCurrentCourse = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/courses/' + cid);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  checkEnrolStatus = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const uid = authService.getUsername();
    const response = await fetch('/courses/checkstatus/' + cid + '/' + uid);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  checkIfFacilitator = async () => {
    const uid = authService.getUsername();
    const response = await fetch('/facilitators/check_facil/' + uid);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  addStudents = async () => {
    if (!this.state.enrolment.length && !this.state.is_a_facil) {
      const cid = JSON.parse(localStorage.getItem('course_code'));
      const yearsem = JSON.parse(localStorage.getItem('year_sem'));
      await fetch('/courses/' + cid + '/students', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: authService.getUsername(),
          yearsem: yearsem
        })
      });

      this.checkEnrolStatus()
        .then(res => {
          this.setState({ enrolment: res });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    var status = this.state.is_a_facil
      ? 'Incharge'
      : this.state.enrolment.length
      ? 'Enrolled'
      : 'Join Course';
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              {this.state.course_details.map((course, i) => (
                <div key={`${i} - course`}>
                  <h1 key={`${i} - course name`} style={{ textTransform: 'uppercase' }}>
                    {course.name}
                  </h1>
                  <h3 key={`${i} - course id`} style={{ textAlign: 'left' }}>
                    {course.cid}
                  </h3>
                </div>
              ))}
            </div>
            <div className="join-button">
              <Button className="btn-lg" onClick={() => this.addStudents()}>
                {status}
              </Button>
            </div>
          </div>
          <div className="course-mainbody rounded">
            <div>
              <h4 className="course-list-header">Tools</h4>
              <ListGroup className="course-list">
                <ListGroup.Item>Announcements</ListGroup.Item>
                <ListGroup.Item>Conferencing</ListGroup.Item>
                <ListGroup.Item>Consultation</ListGroup.Item>
                <ListGroup.Item>Files</ListGroup.Item>
                <ListGroup.Item>Forum</ListGroup.Item>
                <ListGroup.Item>Gradebook</ListGroup.Item>
                <ListGroup.Item>Multimedia</ListGroup.Item>
                <ListGroup.Item>Poll</ListGroup.Item>
                <ListGroup.Item>Quiz</ListGroup.Item>
                <ListGroup.Item>Survey</ListGroup.Item>
                <ListGroup.Item>Webcast</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="course-mainbody-info"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
