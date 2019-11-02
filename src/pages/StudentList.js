import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class StudentList extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar">This is Nav Bar</Navbar>
        <div className="body">
          <CourseNavBar />
          <div className="btn-group student-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">
              All Students
            </button>
            <button type="button" class="btn btn-secondary">
              Lecture Groups
            </button>
            <button type="button" class="btn btn-secondary">
              Tutorial Groups
            </button>
            <button type="button" class="btn btn-secondary">
              Laboratory Groups
            </button>
          </div>
          <div style={{ margin: "50px 100% 30px 0", width: "150px" }}>75 Students</div>
          <ul className="list-group">
            <li className="list-group-item border-right-0 border-left-0 student-list">
              <div className="rounded-circle bg-circle student-info"></div>
              <p className="student-info">Alice</p>
            </li>
            <li className="list-group-item border-right-0 border-left-0 student-list">
              <div className="rounded-circle bg-circle student-info"></div>
              <p className="student-info">Bella</p>
            </li>
            <li className="list-group-item border-right-0 border-left-0 student-list">
              <div className="rounded-circle bg-circle student-info"></div>
              <p className="student-info">Carl</p>
            </li>
            <li className="list-group-item border-right-0 border-left-0 student-list">
              <div className="rounded-circle bg-circle student-info"></div>
              <p className="student-info">Della</p>
            </li>
            <li className="list-group-item border-right-0 border-left-0 student-list">
              <div className="rounded-circle bg-circle student-info"></div>
              <p className="student-info">Fris</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StudentList;
