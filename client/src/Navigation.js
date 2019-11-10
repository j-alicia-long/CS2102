import React from 'react';
import { withRouter } from 'react-router-dom';
import { authService } from './authService';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      userId: ''
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    //this.setUserInfo();
  }

  componentDidUpdate() {
    if (this.state.name) {
      return;
    }
    // this.setUserInfo();
  }

  logout = () => {
    authService.logout();
    fetch('/auth/logout').then(this.props.history.push('/Login'));
  };

  // setUserInfo() {
  //   const user = authService.getUser();
  //   if (user) {
  //     this.setState({ name: user.name, userId: user.uid });
  //   }
  // }

  render() {
    if (authService.loggedIn()) {
      return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="/Home">
            <img
              src={require('./logo.png')}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' Course Star'}
          </Navbar.Brand>
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
              <Navbar.Text className="text-center mx-4 mt-1">{this.state.userId}</Navbar.Text>
              <NavDropdown
                className="justify-content-end"
                title={this.state.name}
                id="basic-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item href="/Account">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Login" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="/Home">
            <img
              src={require('./logo.png')}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' Course Star'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto mx-2">
              <Nav.Item className="mx-2">
                <Nav.Link href="/CourseBrowse">Browse Courses</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link href="/Search">Search</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="mx-2">
                <Nav.Link href="/Login">Login or Sign up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return null;
  }
}

export default withRouter(Navigation);
