import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Navbar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class DiscussionThreads extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar">This is Nav Bar</Navbar>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h2 style={{ textAlign: "left" }}> General Discussion</h2>
            </div>
          </div>
          <div className = "thread-layout">
            <h4 style={{ textAlign: "left" , color: "grey"}}>General Discussion</h4>
            <Card className="thread-card">
                <div className = "thread-description">
                    <p className = "thread-details">
                        <h5 className = "thread-title">General Discussion</h5>
                    </p>
                    <p className = "thread-author">
                        <h6>Wong Yu Qi</h6>
                    </p>
                    <p className = "thread-entry-date">
                        <h6>5 Nov 2019</h6>
                    </p>
                </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionThreads;
