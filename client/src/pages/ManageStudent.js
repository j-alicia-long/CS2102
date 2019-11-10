import React from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

class ManageStudent extends React.Component {
  state = {
    login: false,
    course_details: [],
    all_list: [],
    all_info_list: [],
    lect_list: [],
    lab_list: [],
    tut_list: [],
    distinct_lect: [],
    distinct_lab: [],
    distinct_tut: [],
    all_lessons: [],
    try_list: [],
    showModal: false,
    curr_uid: ''
  };

  componentDidMount() {
    this.fetchCurrentCourse()
      .then(res => {
        this.setState({ course_details: res });
      })
      .catch(err => console.log(err));

    this.fetchAllList()
      .then(res => {
        this.setState({ all_list: res });
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

    this.getAllLessonsInCourse()
      .then(res => {
        this.setState({ all_lessons: res });
      })
      .catch(err => console.log(err));
  }

  fetchAllList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/all/' + cid);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

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

  getAllLessonsInCourse = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/courses/allLessonsInCourse/' + cid);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleClick(lect_gid, tut_gid, lab_gid, lesson_gid, uid, l_type) {
    console.log('lect_gid: ' + lect_gid);
    console.log('tut_gid: ' + tut_gid);
    console.log('lab_gid: ' + lab_gid);
    console.log('lesson_gid: ' + lesson_gid);
    console.log('uid: ' + uid);
    if (lesson_gid === lect_gid || lesson_gid === tut_gid || lesson_gid === lab_gid) {
      alert('Student already in this group');
    } else {
      confirmAlert({
        title: 'Confirm changes',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.changeLesson(lesson_gid, uid, l_type)
          },
          {
            label: 'No',
            onClick: () => confirmAlert({})
          }
        ]
      });
    }
  }

  changeLesson = async (lesson_gid, u_id, type) => {
    const c_id = JSON.parse(localStorage.getItem('course_code'));

    /* Fetch gid of lesson to be delete */
    const response = await fetch('/courses/fetchLessonByType/' + c_id + '/' + u_id + '/' + type);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    if (body.length) {
      await fetch('/courses/lessons/delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cid: c_id,
          gid: body[0].gid,
          uid: u_id,
          l_type: type
        })
      });
    }

    await fetch('/courses/lessons/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid: c_id,
        gid: lesson_gid,
        uid: u_id,
        l_type: type
      })
    });

    alert('Changes made successfully');
  };

  checkValidity = async (uid, gid_list) => {
    const response = await fetch('/students/checkValidity/' + uid + '/' + gid_list);
    const body = await response.json();

    return 1;
  };

  close() {
    this.setState({ showModal: false });
  }

  open(uid, lect_gid, tut_gid, lab_gid) {
    this.setState({
      showModal: true,
      curr_uid: uid,
      curr_lect_gid: lect_gid,
      curr_tut_gid: tut_gid,
      curr_lab_gid: lab_gid
    });

    this.checkConflict(uid)
      .then(res => {
        this.setState({ try_list: res });
      })
      .catch(err => console.log(err));
  }

  checkConflict = async uid => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/checkConflict/' + uid + '/' + cid);
    const body = await response.json();
    console.log(body);
    return body;
  };

  retrieveLect = async uid => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/fetchLect/' + uid + '/' + cid);
    const body = await response.json();
    console.log(body);
    return 1;
  };

  checkValues(message, uid) {
    console.log(message + uid);
  }

  render() {
    var message = this.state.try_list.length
      ? 'Modules that have conflicting schedule: '
      : 'All lessons can be choosen';
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
                    <div className="lesson-info mx-auto lesson-info">
                      Lecture: {student.lect_gid}
                    </div>
                    <div className="lesson-info mx-auto lesson-info">
                      Tutorial: {student.tut_gid}
                    </div>
                    <div className="lesson-info mx-auto lesson-info">Lab: {student.lab_gid}</div>
                  </div>

                  <div className="mx-auto">
                    <Button
                      onClick={() =>
                        this.open(student.uid, student.lect_gid, student.tut_gid, student.lab_gid)
                      }
                    >
                      Modify
                    </Button>

                    <Modal show={this.state.showModal} onHide={() => this.close()}>
                      <Modal.Header closeButton>
                        <Modal.Title>Lessons</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Container>
                          <Row>
                            <Col>
                              {this.state.all_lessons.map((all_lesson, i) => (
                                <div key={`${i}-all_lesson`}>
                                  <button
                                    className="btn btn-outline-success mx-auto"
                                    type="button"
                                    onClick={() =>
                                      this.handleClick(
                                        this.state.curr_lect_gid,
                                        this.state.curr_tut_gid,
                                        this.state.curr_lab_gid,
                                        all_lesson.gid,
                                        this.state.curr_uid,
                                        all_lesson.l_type
                                      )
                                    }
                                  >
                                    {all_lesson.gid}
                                  </button>
                                </div>
                              ))}
                            </Col>
                            <Col>
                              <h5 className="mx-auto">{message}</h5>
                              {this.state.try_list.map((lessons, i) => (
                                <div key={`${i}-lessons`}>
                                  <code>{lessons.curr_gid}</code>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                      </Modal.Footer>
                    </Modal>
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
