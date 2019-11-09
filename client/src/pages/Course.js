import React from 'react';
import '../App.css';
import CourseNavBar from './CourseNavBar';

import { Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Course extends React.Component {
  state = {
    login: false,
    course_details: []
  };

  componentDidMount() {
    this.fetchCurrentCourse()
      .then(res => {
        this.setState({ course_details: res });
      })
      .catch(err => console.log(err));
  }

  fetchCurrentCourse = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/courses/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              {this.state.course_details.map(course => (
                <div>
                  <h1 key = {course.name} style={{ textTransform: 'uppercase' }}>
                    {course.name}
                  </h1>
                  <h3 key={course.cid} style={{ textAlign: 'left' }}>
                    {course.cid}
                  </h3>
                </div>
              ))}
            </div>
            <div className="join-button">
              <Button className="btn-lg">Join</Button>
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
