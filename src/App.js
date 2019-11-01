import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Button from 'react-bootstrap/Button';

import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

import Navigation from "./Navigation.js";

class App extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/users');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log('RESPONSE SUCCESS: ', body);
    return body;
  };

  render() {
    console.log('STATE IN RDNER: ', this.state.data);

    return (
      <div className="App">
        <Navigation></Navigation>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Button>
            <Icon icon={accountIcon} />
            Test
          </Button>
        </header>
        {/* Render the newly fetched data inside of this.state.data */}
        <p className="App-intro">
          {this.state.data.map((user, i) => (
            <div key={i}>
              <p key={i}>User: {user.name}</p>
              <li key={i}>uid: {user.uid}</li>
              <li key={i}>pass: {user.pass}</li>
              <li key={i}>faculty: {user.faculty}</li>
            </div>
          ))}
        </p>
      </div>
    );
  }
}

export default App;
