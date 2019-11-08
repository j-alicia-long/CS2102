import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Form, FormControl, Button, Dropdown} from 'react-bootstrap'

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: 'yooooo',
      selectedOptions: ['Users', 'Courses'],
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
    this.setState({keyword: event.target.value});
  }

  handleOptionsChange(options) {
    this.setState({selectedOptions: options});
  }

  handleSearch(event) {
    alert('You are searching for: ' + this.state.keyword);
    var searchOptions = this.state.selectedOptions;
    var result;
    if(searchOptions.includes("Users")){
      result = this.getUsers(this.state.keyword);
      console.log(result);
      this.setState({
        displayUserResults: true,
        userResults: result
      });
    }
    if(searchOptions.includes("Courses")){
      result = this.getCourses(this.state.keyword);
      console.log(result);
      this.setState({
        displayCourseResults: true,
        courseResults: result
      });
    }
    event.preventDefault();
  }

  getUsers = async (uid) => {
    const response = await fetch('/users/'+uid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  getCourses = async (cid) => {
    const response = await fetch('/courses/'+cid);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const allOptions = ['Users', 'Courses'];
    // console.log(this.state.selectedOptions);
    // console.log(this.state.keyword);

    return (
      <Container className="mt-4">
        <Form>
          <Form.Group as={Row} controlId="searchKeyword">
            <Form.Label column sm="2">Search keyword</Form.Label>
            <Col sm="9">
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
            <Form.Label column sm="2">Search In</Form.Label>
            <Col sm="9">
              <ToggleButtonGroup
                type="checkbox"
                className="mb-3"
                value={this.state.selectedOptions}
                onChange={this.handleOptionsChange}
              >
                {allOptions.map(option => (
                    <ToggleButton value={option} variant="outline-secondary">
                      {option}
                    </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Col>
          </Form.Group>
          <Button onClick={this.handleSearch} variant="outline-success">Search</Button>

          <hr className="my-4"/>

          <Row className="p-2">
            <h3>Search Results</h3>
          </Row>
          <Row className="p-2">
            {this.state.displayUserResults ? (
              <div>
                <h5>Users</h5>
                <p>TBD</p>
              </div>
            ) : (<div></div>)}
          </Row>
          <Row className="p-2">
            {this.state.displayCourseResults ? (
              <div>
                <h5>Courses</h5>
                <p>TBD</p>
              </div>
            ) : (<div></div>)}
          </Row>
        </Form>
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
