import React from "react";
import { withRouter } from "react-router-dom";
import { authService } from "./authService";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.logout = this.logout.bind(this);
  }

  // todo: not working
  componentWillReceiveProps() {
    if (authService.loggedIn()) {
      console.log("loggedin, setting name: ", authService.getUsername());
      this.setState({ username: authService.getUsername() });
    }
  }

  logout = () => {
    authService.logout();
    fetch("/auth/logout").then(this.props.history.push("/Login"));
  };

  render() {
    if (authService.loggedIn()) {
      return (
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="/Home">Course Star</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto mx-2">
              <Nav.Item className="mx-2">
                <Nav.Link href="/MyCourses">My Courses</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link href="/Search">Search</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto" pullRight>
              <p className="text-center mx-4 mt-3">AY19/20 SEM 1</p>
              <NavDropdown
                className="justify-content-end"
                title={this.state.username}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Help</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Login" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return null;
  }
}

export default withRouter(Navigation);
