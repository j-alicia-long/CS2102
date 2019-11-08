import React from 'react';
import '../App.css';
import CourseNavBar from './CourseNavBar';
import { authService } from '../authService';

import 'bootstrap/dist/css/bootstrap.css';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

class StudentList extends React.Component {
  state = {
    all_list: [],
    lect_list: [],
    tut_list: [],
    lab_list: [],
    display_list: [],
    is_a_prof: false
  };

  componentDidMount() {
    this.fetchAllList()
      .then(res => {
        this.setState({ all_list: res });
        this.setState({ display_list: res });
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

    this.is_a_prof()
      .then(res => {
        this.setState({ is_a_prof: res.length ? true : false });
      })
      .catch(err => console.log(err));

    this.setState({ display_list: this.state.all_list });
  }

  fetchAllList = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/all/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS All: ', body);
    return body;
  };

  fetchLectureList = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/lecture/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS Lect: ', body);
    return body;
  };

  fetchLabList = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/lab/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  is_a_prof = async () => {
    const uid = authService.getUsername();
    const response = await fetch('/facilitators/check_prof/' + uid);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  fetchTutList = async () => {
    const c_code = JSON.parse(localStorage.getItem('course_code'));
    const response = await fetch('/students/tutorial/' + c_code);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleClick(item, list) {
    this.setState({
      display_list:
        item === 'All'
          ? this.state.all_list
          : list.filter(lister => {
              return lister.gid === item;
            })
    });
  }

  render() {
    const list_of_lect = this.state.lect_list.map(lect => lect.gid);
    const list_of_tut = this.state.tut_list.map(tut => tut.gid);
    const list_of_lab = this.state.lab_list.map(lab => lab.gid);
    const uniqueLect = Array.from(new Set(list_of_lect));
    const uniqueTut = Array.from(new Set(list_of_tut));
    const uniqueLab = Array.from(new Set(list_of_lab));

    return (
      <div>
        <div className="body">
          <CourseNavBar />
          <div className="nav-groups">
            <button
              className="btn btn-outline-success mx-auto"
              type="button"
              onClick={() => this.handleClick('All', [])}
            >
              All Students
            </button>
            <NavDropdown title="Lecture Groups" className=" text-white">
              {uniqueLect.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => this.handleClick(item, this.state.lect_list)}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Tutorial Groups">
              {uniqueTut.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => this.handleClick(item, this.state.tut_list)}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Laboratory Groups">
              {uniqueLab.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => this.handleClick(item, this.state.lab_list)}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>
          <div className="manage-groups">
            <div style={{ paddingTop: '10px', width: '200px' }}>
              {this.state.display_list.length} students
            </div>
            {this.state.is_a_prof ? (
              <Link to="/ManageStudent" className="join-button manage-btn">
                <button type="button" className="btn btn-info ">
                  Manage Group
                </button>
              </Link>
            ) : (
              ''
            )}
          </div>

          <ul className="list-group">
            {this.state.display_list.map((student, i) => (
              <div key={`${i}-student`}>
                <li className="list-group-item border-right-0 border-left-0 student-list">
                  <div className="student-div">
                    <Icon icon={accountIcon} className="student-info student-icon" />
                    <p className="student-info" key={`${i}-uid`}>
                      {student.uid}
                    </p>
                    <p className="student-info" key={`${i}-gid`}>
                      {student.gid}
                    </p>
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

export default StudentList;
