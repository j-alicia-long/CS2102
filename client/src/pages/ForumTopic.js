import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class ForumTopic extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              <h2 style={{ textAlign: "left" }}> NEW FORUM TOPIC</h2>
            </div>
          </div>
          <div className="form-layout">
            <Card className="new-forum">
              <form action="" method="get">
                <div>
                  <label>
                    <h5>Forum Title: </h5>
                  </label>
                  <input
                    type="text"
                    className="forum-title"
                    id="forum-title"
                    required
                  ></input>
                </div>
                <div>
                  <label>
                    <h5>Forum Description: </h5>
                  </label>
                  <input
                    type="text"
                    className="forum-details"
                    id="forum-details"
                  ></input>
                </div>
                <div>
                  <label>
                    <h5>Close Forum on: </h5>
                  </label>
                  <input
                    type="datetime-local"
                    className="forum-date"
                    id="forum-date"
                  ></input>
                </div>
                <div>
                  <fieldset>
                    <label>
                      <h5>Access: </h5>
                    </label>
                    <div className="forum-access">
                      <input type="radio" name="tutgrp" id="tut1" />
                      <label for="tut1">Tutorial Group 1</label>
                      <input type="radio" name="tutgrp" id="tut2" />
                      <label for="tut2">Tutorial Group 2</label>
                      <input type="radio" name="tutgrp" id="tut3" />
                      <label for="tut3">Tutorial Group 3</label>
                      <input type="radio" name="tutgrp" id="tut4" />
                      <label for="tut4">Tutorial Group 4</label>
                    </div>
                  </fieldset>
                </div>
                <div></div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ForumTopic;
