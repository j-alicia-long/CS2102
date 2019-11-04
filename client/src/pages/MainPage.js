import React from "react";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <div>This is the main page</div>
        <Link to="/Course">Go to course overview</Link>
      </div>
    );
  }
}

export default MainPage;
