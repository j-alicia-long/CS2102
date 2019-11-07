import React from "react";
import { Link } from "react-router-dom";


class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/Login">Login to your account</Link>

        <Link to="/Course">Go to course overview</Link>
      </div>
    );
  }
}

export default MainPage;
