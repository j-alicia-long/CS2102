import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, FormControl, Button } from 'react-bootstrap';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      selectedOptions: ['Users', 'Courses'],
      hasSearched: false,
      displayUserResults: false,
      displayCourseResults: false,
      userResults: {},
      courseResults: {}
    };

    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleKeywordChange(event) {
    this.setState({ keyword: event.target.value });
  }

  handleOptionsChange(options) {
    this.setState({ selectedOptions: options });
  }

  handleSearch(event) {
    // Clear results display
    this.setState({
      displayUserResults: false,
      displayCourseResults: false
    });
    var searchOptions = this.state.selectedOptions;

    if (searchOptions.includes('Users')) {
      this.getUsers(this.state.keyword)
        .then(result => {
          this.setState({
            hasSearched: true,
            displayUserResults: true,
            userResults: result
          });
          console.log(result);
        })
        .catch(err => console.log(err));
    }
    if (searchOptions.includes('Courses')) {
      this.getCourses(this.state.keyword)
        .then(result => {
          this.setState({
            hasSearched: true,
            displayCourseResults: true,
            courseResults: result
          });
          console.log(result);
        })
        .catch(err => console.log(err));
    }
    event.preventDefault();
  }

  getUsers = async uid => {
    const response = await fetch('/users/' + uid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  getCourses = async cid => {
    const response = await fetch('/courses/' + cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // For redirecting to a course overview page
  handleClick(c_code) {
    const code = c_code;
    localStorage.setItem('course_code', JSON.stringify(code));
  }

  render() {
    const allOptions = ['Users', 'Courses'];

    return (
      <Container className="mt-4">
        <Form>
          <h3>Search</h3>
          <Form.Group as={Row} controlId="searchKeyword">
            <Form.Label column md="3">
              Search keyword
            </Form.Label>
            <Col md="9">
              <FormControl
                type="text"
                placeholder="User ID, Course ID"
                className="mr-sm-2"
                value={this.state.keyword}
                onChange={this.handleKeywordChange.bind(this)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="searchOptions">
            <Form.Label column md="3">
              Search In
            </Form.Label>
            <Col md="9">
              <ToggleButtonGroup
                type="checkbox"
                className="mb-3"
                value={this.state.selectedOptions}
                onChange={this.handleOptionsChange}
              >
                {allOptions.map(option => (
                  <ToggleButton value={option} variant="outline-success">
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Col>
          </Form.Group>
          <Button onClick={this.handleSearch} variant="outline-primary">
            Search
          </Button>
        </Form>

        <hr className="my-4" />

        {this.state.hasSearched ? (
          <Row className="p-2">
            <h3>Search Results</h3>
          </Row>
        ) : (
          <div></div>
        )}

        {this.state.displayUserResults ? (
          <Row className="p-2">
            <Col sm="3">
              <h5>Users</h5>
            </Col>
            <Col>
              {this.state.userResults.length === 0 ? (
                <p>No results found</p>
              ) : (
                this.state.userResults.map(user => (
                  <p>
                    {user.uid}: {user.name}
                  </p>
                ))
              )}
            </Col>
          </Row>
        ) : (
          <div></div>
        )}

        {this.state.displayCourseResults ? (
          <Row className="p-2">
            <Col sm="3">
              <h5>Courses</h5>
            </Col>
            <Col>
              {this.state.courseResults.length === 0 ? (
                <p>No results found</p>
              ) : (
                this.state.courseResults.map(course => (
                  <Link to="/Course" onClick={() => this.handleClick(course.cid)}>
                    {course.cid}: {course.name}
                  </Link>
                ))
              )}
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
      </Container>
    );
  }
}

export default SearchPage;

// Notes on setState:
// this.setState((state) => {
//   // Important: read `state` instead of `this.state` when updating.
//   return {
//     keyword: state.keyword,
//     selectedOptions: value,
//   }
// });
