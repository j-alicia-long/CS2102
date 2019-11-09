import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Card, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class DiscussionThreads extends React.Component {
  state = {
    login: false,
    forum_list: [],
    threads_list: [],
    entries_list: [],
    course_details: []
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
        this.setState({ entries_list: res});
      })
      .catch(err => console.log(err));
      
    this.fetchForumList()
      .then( res => {
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

  

  render() {
    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="course-description">
          <div>
              {this.state.course_details.map(course => (
                this.state.forum_list.map((forum, i) =>( 
                  this.state.threads_list.map(threads => (
                    this.state.entries_list.map(entries => (
                <div>
                  <h2 key={(course.cid) (`${i}-forum`.f_dscp) } style={{ textAlign: 'left' }}>
                    <a href ="/CourseForum">{course.cid} Forum</a> > FORUM
                  </h2>
                </div>
                    )) 
                  ))
                ))
              ))}
            </div>
    
          <div className="join-button">
              <Nav.Link href="/NewForumEntry" >
              <Button className="btn-lg">Start a Discussion Thread</Button>
              </Nav.Link>
          </div>
          </div>
          <div className = "thread-layout">
            {this.state.threads_list.map( (threads, i) => (
              <h4 style={{ textAlign: "left" , color: "grey"}} key = {`${i}-threads`}>{threads.t_title}</h4>
            ))}
            <Card className="thread-card">
               {this.state.threads_list.map(threads => ( 
                 this.state.entries_list.map(entries => (
                   this.state.forum_list.map(forum => (
                    
                <div className = "thread-description">
                    <p className = "thread-details">
                        <h5 className = "thread-title" key = {threads.t_title}>{threads.t_title}</h5>
                    </p>
                    <p className = "thread-author" key = {threads.uid}>
                        <h6>{threads.uid}</h6>
                    </p>
                    <p className = "thread-entry-date" key = {threads.t_date}>
                        <h6>{threads.t_date}</h6>
                    </p>
                    <p className="num-reply" key = {entries.num_e}>
                        <h6>{entries.num_e}</h6>
                    </p>
                    <p className= "num-views" key = {threads.t_views}>
                        <h6>{threads.t_views}</h6>
                    </p>
                    <p className = "last-reply-date" key = {entries.e_date}>
                        <h6>{entries.e_date}</h6>
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

export default DiscussionThreads;
