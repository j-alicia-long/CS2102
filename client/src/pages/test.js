import React from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import CourseNavBar from './CourseNavBar';

import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class ForumTopic extends React.Component {
  state = {
    login: false,
    course_details: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
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

  constructor(props) {
    super(props);
    this.state = { f_title: '', f_dscp: '', f_date: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('/forum', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
            }{' '}
            <div>
              {this.state.course_details.map(course => (
                <div>
                  <h3 key={course.cid} style={{ textAlign: 'left' }}>
                    {course.cid} FORUM
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="form-layout">
            <Card className="new-forum">
              <form action="" method="get">
                <div>
                  <label>
                    <h5>Forum Title: </h5>
                  </label>
                  <input type="text" className="forum-title" id="f_title" required></input>
                </div>
                <div>
                  <label>
                    <h5>Forum Description: </h5>
                  </label>
                  <input type="text" className="forum-details" id="f_dscp"></input>
                </div>
                <div>
                  <label>
                    <h5>Close Forum on: </h5>
                  </label>
                  <input type="datetime-local" className="forum-date" id="f_date"></input>
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

export default withRouter(ForumTopic);
