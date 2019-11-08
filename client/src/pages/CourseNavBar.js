import React from 'react';
import '../App.css';

import { Nav } from 'react-bootstrap';

class CourseNavBar extends React.Component {
  render() {
    return (
      <Nav className="nav rounded">
        <Nav.Item>
          <Nav.Link className="nav-item" href="/Course">
            Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/CourseForum">
            Forum
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/FacilitatorList">
            Facilitators
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/StudentList">
            Students
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default CourseNavBar;
