import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Navbar, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class CourseForum extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h2 style={{ textAlign: "left" }}> CS2102 FORUM</h2>
            </div>
            <div className="join-button">
              <Nav.Link href="/ForumTopic" >
              <Button className="btn-lg">Create New Topic</Button>
              </Nav.Link>
            </div>
          </div>
          <div className = "forum-layout">
            <h4 style={{ textAlign: "left" , color: "grey"}}>General Discussion</h4>
            <Card className="forum-card">
                <div className = "forum-description">
                    <p className = "forum-details">
                        <h5 className = "forum-title">General Discussion</h5>
                        Posts on module relevant topics.<br></br>
                        Visible until 10 Dec 2019 11:50pm.
                    </p>
                    <p className = "forum-threads">
                      <Nav.Link href="/DiscussionThreads">
                        <h6>2 Discussion Threads</h6>
                      </Nav.Link>
                    </p>
                    <p className = "entry-date">
                        <h6>Last Post: 5 Nov 2019</h6>
                        Re: Clarification on finals.
                    </p>
                </div>
            </Card>
            <h4 style={{ textAlign: "left" , color: "grey"}}>Lecture Questions</h4>
            <Card className="forum-card">
                <div className ="forum-description">
                    <p className = "forum-details">
                        <h5 className = "forum-title">Lectures</h5>
                        Posts on Lectures.<br></br>
                        Visible until 10 Dec 2019 11:50pm.
                    </p>
                    <p className = "forum-threads">
                      <Nav.Link href="/DiscussionThreads">
                        <h6>1 Discussion Threads</h6>
                      </Nav.Link>
                    </p>
                    <p className = "entry-date">
                        <h6>Last Post: 6 Nov 2019</h6>
                        Re: Clarification on Lecture 9
                    </p>
                </div>
            </Card>
            <h4 style={{ textAlign: "left" , color: "grey"}}>Tutorial Questions</h4>
            <Card className="forum-card">
                <div className ="forum-description">
                    <p className = "forum-details">
                        <h5 className = "forum-title">Tutorials</h5>
                        Posts on Tutorial Questions.<br></br>
                        Visible until 10 Dec 2019 11:50pm.
                    </p>
                    <p className = "forum-threads">
                      <Nav.Link href="/DiscussionThreads">
                        <h6>0 Discussion Threads</h6>
                      </Nav.Link>
                    </p>
                    <p className = "entry-date">
                        
                    </p>
                </div>
            </Card>
            <h4 style={{ textAlign: "left" , color: "grey"}}>Assignment Questions</h4>
            <Card className="forum-card">
                <div className ="forum-description">
                    <p className = "forum-details">
                        <h5 className = "forum-title">Assignment</h5>
                        Posts on Assignment Questions.<br></br>
                        Visible until 10 Dec 2019 11:50pm.
                    </p>
                    <p className = "forum-threads">
                      <Nav.Link href="/DiscussionThreads">
                        <h6>2 Discussion Threads</h6>
                      </Nav.Link>
                    </p>
                    <p className = "entry-date">
                        <h6>Last Post: 6 Nov 2019</h6>
                        Re: Clarification on Assignment 4
                    </p>
                </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseForum;
