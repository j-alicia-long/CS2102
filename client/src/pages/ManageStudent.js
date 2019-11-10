import React from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

class ManageStudent extends React.Component {
  state = {
    login: false,
    course_details: [],
    all_info_list: [],
    lect_list: [],
    lab_list: [],
    tut_list: [],
    distinct_lect: [],
    distinct_lab: [],
    distinct_tut: [],
    m_lect_list: [],
    m_tut_list: [],
    m_lab_list: []
  };

  componentDidMount() {
    this.fetchCurrentCourse()
      .then(res => {
        this.setState({ course_details: res });
      })
      .catch(err => console.log(err));

    this.fetchStudentList()
      .then(res => {
        this.setState({ all_info_list: res });
      })
      .catch(err => console.log(err));

    this.fetchLectureList()
      .then(res => {
        this.setState({ lect_list: res });
      })
      .catch(err => console.log(err));

    this.fetchLabList()
      .then(res => {
        this.setState({ lab_list: res });
      })
      .catch(err => console.log(err));

    this.fetchTutList()
      .then(res => {
        this.setState({ tut_list: res });
      })
      .catch(err => console.log(err));

    this.fetchDistinct('Lecture')
      .then(res => {
        this.setState({ distinct_lect: res });
      })
      .catch(err => console.log(err));

    this.fetchDistinct('Lab')
      .then(res => {
        this.setState({ distinct_lab: res });
      })
      .catch(err => console.log(err));

    this.fetchDistinct('Tutorial')
      .then(res => {
        this.setState({ distinct_tut: res });
      })
      .catch(err => console.log(err));
  }

  fetchDistinct = async type => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/courses/distinct/' + cid + '/' + type);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchCurrentCourse = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/courses/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchStudentList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/all_info/' + cid);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchLectureList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/lecture/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchLabList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/lab/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchTutList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/tutorial/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleClick(gid, curr_gid, uid, type) {
    if (gid === curr_gid) {
      alert('Student already in this group');
    } else {
      confirmAlert({
        title: 'Confirm changes',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.changeLesson(gid, curr_gid, uid, type)
          },
          {
            label: 'No',
            onClick: () => alert('Cancelled')
          }
        ]
      });
    }
  }

  changeLesson = async (g_id, curr_gid, u_id, type) => {
    const c_id = JSON.parse(localStorage.getItem('course_code'));
    console.log(g_id, curr_gid, u_id, type, c_id);
    await fetch('/courses/lessons/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid: c_id,
        gid: g_id,
        currgid: curr_gid,
        uid: u_id,
        l_type: type
      })
    });

    await fetch('/courses/lessons/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid: c_id,
        gid: g_id,
        currgid: curr_gid,
        uid: u_id,
        l_type: type
      })
    });

    alert('Changes made successfully');
  };

  checkValidity = async (uid, gid_list) => {
    const response = await fetch('/students/checkValidity/' + uid + '/' + gid_list);
    const body = await response.json();

    return body;
  };

  render() {
    return (
      <div className="body">
        <div style={{ marginTop: '30px', paddingBottom: '30px' }}>
          <Link to="/StudentList" className="join-button manage-btn">
            <button
              type="button"
              className="btn btn-info"
              style={{ marginLeft: '100%', marginBottom: '30px', width: '100px' }}
            >
              Go Back
            </button>
          </Link>
          <ul className="list-group">
            {this.state.all_info_list.map((student, i) => (
              <div key={`${i}-student`}>
                <li
                  className="list-group-item border-right-0 border-left-0 student-list"
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <div className="student-div" style={{ display: 'inline-block' }}>
                    <Icon icon={accountIcon} className="student-info student-icon" />
                    <p className="student-info" key={`${i}-uid`}>
                      {student.uid}
                    </p>
                  </div>
                  <div className="mx-auto">
                    <div className="lesson-row" key={`${i}-lect-gid`}>
                      <div className="lesson-info">Lecture: {student.lect_gid}</div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Update Lecture"
                        drop="right"
                      >
                        {this.state.distinct_lect.map((item, index) => (
                          <Dropdown.Item
                            key={`${index}-lect-gid`}
                            as="button"
                            onClick={() =>
                              this.handleClick(student.lect_gid, item.gid, student.uid, 'Lecture')
                            }
                            id="ggg"
                            style={{
                              textDecoration: this.checkValidity(student.uid, item.gid).length
                                ? 'underline'
                                : ''
                            }}
                          >
                            {item.gid}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </div>
                    <div className="lesson-row" key={`${i}-tut-gid`}>
                      <div className="lesson-info">Tutorial: {student.tut_gid}</div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Update Tutorial"
                        drop="right"
                      >
                        {this.state.distinct_tut.map((item, index) => (
                          <Dropdown.Item
                            key={`${index}-tut-gid`}
                            onClick={() =>
                              this.handleClick(student.tut_gid, item.gid, student.uid, 'Tutorial')
                            }
                            style={{
                              textDecoration: this.checkValidity(student.uid, item.gid).length
                                ? 'underline'
                                : ''
                            }}
                          >
                            {item.gid}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </div>
                    <div className="lesson-row" key={`${i}-lab-gid`}>
                      <div className="lesson-info">Laboratory: {student.lab_gid}</div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Update Laboratory"
                        drop="right"
                      >
                        {this.state.distinct_lab.map((item, index) => (
                          <Dropdown.Item
                            key={`${index}-lab-gid`}
                            onClick={() =>
                              this.handleClick(student.lab_gid, item.gid, student.uid, 'Lab')
                            }
                          >
                            <div
                              style={{
                                textDecoration: this.checkValidity(student.uid, item.gid).length
                                  ? 'underline'
                                  : ''
                              }}
                            >
                              {item.gid}
                            </div>
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ManageStudent;
