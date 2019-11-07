import React from 'react';
import '../App.css';
import CourseNavBar from './CourseNavBar';

import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import { Card } from 'react-bootstrap';

class FacilitatorList extends React.Component {
  state = {
    login: false,
    ta_list: [],
    prof_list: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.fetchProfFromCourse()
      .then(res => {
        this.setState({ prof_list: res });
      })
      .catch(err => console.log(err));

    this.fetchTAFromCourse()
      .then(res => {
        this.setState({ ta_list: res });
      })
      .catch(err => console.log(err));
  }

  fetchProfFromCourse = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/facilitators/prof/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  fetchTAFromCourse = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/facilitators/ta/' + c_code);
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
          <div className="facil-list-bg rounded">
            <div className="facil-layout">
              {this.state.prof_list.map((prof, i) => (
                <Card key={`${i}-prof`} className="facil-card">
                  <Icon icon={accountIcon} className="account-icon" />
                  <Card.Body>
                    <h4 key={`${i}-name`}>{prof.name}</h4>
                    <h5 style={{ color: 'gray', fontStyle: 'italic' }}>Professor</h5>
                    <p key={`${i}-gid`}>{prof.gid}</p>
                  </Card.Body>
                </Card>
              ))}
              {this.state.ta_list.map((ta, i) => (
                <Card key={`${i}-ta`} className="facil-card">
                  <Icon icon={accountIcon} className="account-icon" />
                  <Card.Body>
                    <h4 key={`${i}-name`}>{ta.name}</h4>
                    <h5 style={{ color: 'lightblue', fontStyle: 'italic' }}>Teaching Assistant</h5>
                    <p key={`${i}-gid`}>{ta.gid}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FacilitatorList;
