import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class CourseForum extends React.Component {
  state = {
    login: false,
    threads_list: [],
    course_details: [],
    forum_list: [],
  };
  componentDidMount() {
    // Call our fetch function below once the component mounts

    this.fetchThreadsList()
      .then(res => {
        this.setState({ threads_list: res });
      })
      .catch(err => console.log(err));

    this.fetchEntriesList()
      .then(res => {
        this.setState({ entries_list: res });
      })
      .catch(err => console.log(err));

    this.fetchForumList()
      .then(res => {
        this.setState({ forum_list: res });
      })
      .catch(err => console.log(err));


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


  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  fetchThreadsList = async () => {
    const t_code = JSON.parse(localStorage.getItem('thread_code'));
    const response = await fetch('/threads' + t_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  fetchEntriesList = async () => {
    const e_code = JSON.parse(localStorage.getItem('entry_code'));
    const response = await fetch('/entries' + e_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  fetchForumList = async () => {
    const f_code = JSON.parse(localStorage.getItem('forum_code'));
    const response = await fetch('/forum' + f_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  /*
  render() {
    return (
      <div>
        <div className = "body">
          <CourseNavBar />
          <div className="course-description">
            <div>
              {this.state.course_details.map(course => (
                <div>
                  <h2 style={{ textAlign: "left" }} key={course.cid}> {course.cid} FORUM</h2>
                </div>
              ))}
              <div className="join-button">
                <Nav.Link href="/ForumTopic" >
                  <Button className="btn-lg">Create New Topic</Button>
                </Nav.Link>
              </div>
              <div className="forum-layout">
                <h4 style={{ textAlign: "left", color: "grey" }}> General Discussion</h4>
              <Card className="forum-card">
                  <div className="forum-description">
                          <p className="forum-details">
                            <h5 className="forum-title"> General Discussion</h5>
                            <br></br>
                            Visible until 10 Dec 2019
                          </p>
                          <p className="forum-threads" >
                            <a href="/DiscussionThreads">
                              <h6>2 Discussion Threads</h6>
                            </a>
                          </p>
                          <p className="entry-date" >
                            <h6>Last Post: 10 Nov 2019</h6>
                            Re: Clarification of Finals.
                          </p>
                        </div>
                </Card>
                <Card className="forum-card">
                  {this.state.forum_list.map((forum, i) => (
                    this.state.threads_list.map(threads => (
                      this.state.entries_list.map(entries => (

                        <div className="forum-description">
                          <p className="forum-details">
                            <h5 className="forum-title" key={(forum.f_title), (forum.f_dscp), (forum.f_date)}>{forum.f_title}</h5>
                            {forum.f_dscp}<br></br>
                            Visible until {forum.f_date}
                          </p>
                          <p className="forum-threads" key={entries.num_e}>
                            <a href="/DiscussionThreads">
                              <h6>{entries.num_e} Discussion Threads</h6>
                            </a>
                          </p>
                          <p className="entry-date" key={(threads.t_title), (entries.e_date)}>
                            <h6>Last Post: {entries.e_date}</h6>
                            Re: {threads.t_title}
                          </p>
                        </div>
                      ))
                    ))
                  ))}
                </Card>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
*/

  render() {
    return (
      <div>
        <div className="body">
        <CourseNavBar />
          <div className="course-description" >
            <div>
              {this.state.course_details.map( course => 
              <h2 style={{ textAlign: "left" }} key = {course.cid}> {course.cid} FORUM</h2>
              )}
            </div>
            <div className="new-button">
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
            { this.state.forum_list.map( forum => 
            <h4 style={{ textAlign: "left" , color: "grey"}} key = {forum.f_title}>{forum.f_title}</h4>
            )}
            <Card className="forum-card">
                  {this.state.forum_list.map((forum, i) => (
                    this.state.threads_list.map(threads => (
                      this.state.entries_list.map(entries => (

                        <div className="forum-description">
                          <p className="forum-details">
                            <h5 className="forum-title" key={(forum.f_title), (forum.f_dscp), (forum.f_date)}>{forum.f_title}</h5>
                            {forum.f_dscp}<br></br>
                            Visible until {forum.f_date}
                          </p>
                          <p className="forum-threads" key={entries.num_e}>
                            <a href="/DiscussionThreads">
                              <h6>{entries.num_e} Discussion Threads</h6>
                            </a>
                          </p>
                          <p className="entry-date" key={(threads.t_title), (entries.e_date)}>
                            <h6>Last Post: {entries.e_date}</h6>
                            Re: {threads.t_title}
                          </p>
                        </div>
                      ))
                    ))
                  ))}
                </Card>
          </div>
          </div>
        </div>
    );
  }
}

export default CourseForum;