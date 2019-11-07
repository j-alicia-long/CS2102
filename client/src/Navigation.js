import React from "react";
import { withRouter } from "react-router-dom";
import { authService } from "./authService";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setName();
  }

  componentDidUpdate() {
    if (this.state.name) {
      return;
    }
    this.setName();
  }

  logout = () => {
    authService.logout();
    fetch("/auth/logout").then(this.props.history.push("/Login"));
  };

  setName() {
    const user = authService.getUser();
    if (user) {
      this.setState({ name: user.name });
    }
  }

  render() {
    if (authService.loggedIn()) {
      return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
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
            <Nav>
              <Navbar.Text className="text-center mx-4 mt-1">
                AY19/20 SEM 1
              </Navbar.Text>
              <NavDropdown
                className="justify-content-end"
                title={this.state.name}
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
