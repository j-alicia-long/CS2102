import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class CourseForum extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar">This is Nav Bar</Navbar>
        <div className="body">
          <CourseNavBar />
          
        </div>
      </div>
    );
  }
}

export default CourseForum;
