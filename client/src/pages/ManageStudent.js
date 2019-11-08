import React from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';

class ManageStudent extends React.Component {
  state = {
    login: false,
    course_details: []
  };

  componentDidMount() {
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

  render() {
    return (
      <div className="body">
        <div> hello</div>
      </div>
    );
  }
}

export default ManageStudent;
