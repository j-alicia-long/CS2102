import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class NewForumEntry extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h2 style={{ textAlign: "left" }}> NEW DISCUSSION THREAD</h2>
            </div>
          </div>
          <div className="forum-layout">
            <Card className="new-forum">
              <form action="" method="get">
                <div>
                  <label>
                    <h5>Title:</h5>
                  </label>
                  <input
                    type="text"
                    className="entry-title"
                    id="entry-title"
                    required
                  ></input>
                </div>
                <div>
                  <label>
                    <h5>Post:</h5>
                  </label>
                  <textarea className="entry-post" id="entry-post"></textarea>
                </div>
                <div>
                  <label>
                    <h5>Attachment(s):</h5>
                  </label>
                  <input
                    type="file"
                    className="entry-attach"
                    id="entry-attach"
                  ></input>
                </div>
                <div className="submit-button">
                  <input type="submit" value="Submit"></input>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default NewForumEntry;
