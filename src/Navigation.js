import React from "react";

import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'


class Navigation extends React.Component {

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Course Star</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="#home">Courses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Search</Nav.Link>
            </Nav.Item>
          </Nav>
          <p className="text-center mt-2 mb-2">YEAR/SEM</p>
          <NavDropdown className="justify-content-end" alignRight="true" title="Student" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My courses</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
