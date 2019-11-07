import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Card, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class DiscussionThreads extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h2 style={{ textAlign: "left" }}>
                {" "}
                <a href="/CourseForum">CS2102 Forum</a> > General Discussion
              </h2>
            </div>

            <div className="join-button">
              <Nav.Link href="/NewForumEntry">
                <Button className="btn-lg">Start a Discussion Thread</Button>
              </Nav.Link>
            </div>
          </div>
          <div className="thread-layout">
            <h4 style={{ textAlign: "left", color: "grey" }}>
              General Discussion
            </h4>
            <Card className="thread-card">
              <div className="thread-description">
                <p className="thread-details">
                  <h5 className="thread-title">Clarification on finals.</h5>
                </p>
                <p className="thread-author">
                  <h6>Wong Yu Qi</h6>
                </p>
                <p className="thread-entry-date">
                  <h6>5 Nov 2019</h6>
                </p>
                <p className="num-reply">
                  <h6>2 Replies</h6>
                </p>
                <p className="num-views">
                  <h6>60 Views</h6>
                </p>
                <p className="last-reply-date">
                  <h6>Last Reply: 7 Nov 2019</h6>
                </p>
              </div>
            </Card>
            <Card className="thread-card">
              <div className="thread-description">
                <p className="thread-details">
                  <h5 className="thread-title">Question regarding Midterm</h5>
                </p>
                <p className="thread-author">
                  <h6>Loh Jia Hao</h6>
                </p>
                <p className="thread-entry-date">
                  <h6>15 Sep 2019</h6>
                </p>
                <p className="num-reply">
                  <h6>2 Replies</h6>
                </p>
                <p className="num-views">
                  <h6>80 Views</h6>
                </p>
                <p className="last-reply-date">
                  <h6>Last Reply: 18 Sep 2019</h6>
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
