import React from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import { Button, Modal, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddGroups extends React.Component {
  state = {
    all_list: [],
    lect_list: [],
    tut_list: [],
    lab_list: [],
    selected_lect: '',
    selected_tut: '',
    selected_lab: ''
  };
  componentDidMount() {
    this.fetchAllList()
      .then(res => {
        this.setState({ all_list: res });
      })
      .catch(err => console.log(err));

    this.fetchLessonType('Lecture')
      .then(res => {
        this.setState({ lect_list: res });
      })
      .catch(err => console.log(err));

    this.fetchLessonType('Tutorial')
      .then(res => {
        this.setState({ tut_list: res });
      })
      .catch(err => console.log(err));

    this.fetchLessonType('Lab')
      .then(res => {
        this.setState({ lab_list: res });
      })
      .catch(err => console.log(err));
  }

  fetchAllList = async () => {
    const cid = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/all_noLessons/' + cid);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchLessonType = async type => {
    const cid = JSON.parse(localStorage.getItem('course_code'));

    const response = await fetch('/courses/fetchLessonType/' + cid + '/' + type);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  close() {
    this.setState({ showModal: false, selected_lect: '', selected_tut: '', selected_lab: '' });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleSubmit(u_id) {
    console.log(this.state.selected_lab);
    console.log(this.state.selected_lect);
    console.log(this.state.selected_tut);
    if (
      this.state.selected_lect !== '' &&
      this.state.selected_tut !== '' &&
      this.state.selected_lab !== ''
    ) {
      this.assignStudent(
        u_id,
        this.state.selected_lect,
        this.state.selected_tut,
        this.state.selected_lab
      );
      alert('Update complete, please refresh browser.');
      this.close();
    } else {
      alert('Please select all lessons');
    }
  }

  assignStudent = async (u_id, lect_gid, tut_gid, lab_gid) => {
    console.log(u_id, lect_gid, tut_gid, lab_gid);

    const c_id = JSON.parse(localStorage.getItem('course_code'));
    await fetch('/courses/lessons/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid: c_id,
        gid: lect_gid,
        uid: u_id,
        l_type: 'Lecture'
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
        gid: tut_gid,
        uid: u_id,
        l_type: 'Tutorial'
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
        gid: lab_gid,
        uid: u_id,
        l_type: 'Lab'
      })
    });
  };

  render() {
    return (
      <div className="body" style={{ marginTop: '50px' }}>
        <h1>Newly joined students without any lesson slots</h1>
        <Link to="/StudentList" className="join-button manage-btn">
          <button
            type="button"
            className="btn btn-info"
            style={{ marginLeft: '100%', marginBottom: '30px', width: '100px' }}
          >
            Go Back
          </button>
        </Link>
        <div>
          {this.state.all_list.map((student, i) => (
            <div key={`${i}-student`}>
              <li
                className="list-group-item border-right-0 border-left-0 student-list"
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <div className="student-div" style={{ display: 'inline-block', margin: 'auto' }}>
                  <Icon icon={accountIcon} className="student-info student-icon" />
                  <p className="student-info" key={`${i}-uid`}>
                    {student.uid}
                  </p>
                </div>

                <Button className="btn btn-info addBtn" onClick={() => this.open()}>
                  Allocate
                </Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Form>
                        <div>
                          <h3>Lecture</h3>
                          {this.state.lect_list.map((lect, i) => (
                            <div key={`${i}-lect`}>
                              <Form.Check
                                type="radio"
                                id="default-radio"
                                label={lect.gid}
                                name="lect-radio"
                                onClick={() => this.setState({ selected_lect: lect.gid })}
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3>Tutorial</h3>
                          {this.state.tut_list.map((tut, i) => (
                            <div key={`${i}-tut`}>
                              <Form.Check
                                type="radio"
                                id="default-radio"
                                label={tut.gid}
                                name="tut-radio"
                                onClick={() => this.setState({ selected_tut: tut.gid })}
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3>Lab</h3>
                          {this.state.lab_list.map((lab, i) => (
                            <div key={`${i}-lab`}>
                              <Form.Check
                                type="radio"
                                id="default-radio"
                                label={lab.gid}
                                name="lab-radio"
                                onClick={() => this.setState({ selected_lab: lab.gid })}
                              />
                            </div>
                          ))}
                        </div>
                      </Form>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => this.handleSubmit(student.uid)}>Add</Button>
                    <Button onClick={() => this.close()}>Cancel</Button>
                  </Modal.Footer>
                </Modal>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddGroups;
