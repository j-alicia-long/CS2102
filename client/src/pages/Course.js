import React from 'react';
import '../App.css';
import CourseNavBar from './CourseNavBar';

import { Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { confirmAlert } from 'react-confirm-alert';

class Course extends React.Component {
  state = {
    login: false,
    course_details: [],
    isA_facilOfCourse: false,
    isA_facil: false,
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

    this.checkIfFacilOfCourse()
      .then(res => {
        this.setState({ isA_facilOfCourse: res.length ? true : false });
      })
      .catch(err => console.log(err));

    this.checkIfFacil()
      .then(res => {
        this.setState({ isA_facil: res.length ? true : false });
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
    const uid = JSON.parse(localStorage.getItem('user_id'));
    const response = await fetch('/courses/checkstatus/' + cid + '/' + uid);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  checkIfFacilOfCourse = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const uid = JSON.parse(localStorage.getItem('user_id'));
    const response = await fetch('/facilitators/checkIfFacilOfCourse/' + uid + '/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('Facil of C: ');
    console.log(body);
    return body;
  };

  checkIfFacil = async () => {
    const uid = JSON.parse(localStorage.getItem('user_id'));
    const response = await fetch('/facilitators/checkIfFacil/' + uid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log('Jz Facil: ');
    console.log(body);
    return body;
  };

  addStudents = async () => {
    if (!this.state.enrolment.length && !this.state.isA_facil && !this.state.isA_facilOfCourse) {
      const cid = JSON.parse(localStorage.getItem('course_code'));
      const yearsem = JSON.parse(localStorage.getItem('year_sem'));
      await fetch('/courses/' + cid + '/students', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: JSON.parse(localStorage.getItem('user_id')),
          yearsem: yearsem
        })
      });

      this.checkEnrolStatus()
        .then(res => {
          this.setState({ enrolment: res });
        })
        .catch(err => console.log(err));

      confirmAlert({
        title: 'Successfully Enrolled',
        message: cid,
        buttons: [
          {
            label: 'Yes'
          }
        ]
      });
    }
  };

  render() {
    var status = this.state.isA_facilOfCourse
      ? 'Incharge'
      : this.state.isA_facil
      ? 'Ineligible'
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
