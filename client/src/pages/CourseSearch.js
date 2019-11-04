import React from "react";

import {Form, FormControl, Button} from 'react-bootstrap'


class CourseSearch extends React.Component {

  render() {
    return (
      <div>
          <Form inline>
            <FormControl type="text" placeholder="Course ID" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
      </div>
    );
  }
}

export default CourseSearch;
