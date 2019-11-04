import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Navbar, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class Course extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar">This is Nav Bar</Navbar>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h1>DATABASE SYSTEMS</h1>
              <h3 style={{ textAlign: "left" }}> CS2102</h3>
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
