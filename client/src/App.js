import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from 'react-bootstrap/Button';

import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Button>
            <Icon icon={accountIcon} />
            Test
          </Button>
        </header>
        <h1>DATABASE</h1>
        <div className="App-intro">
          {this.state.data.map((user, i) => (
            <div key={`${i}-user`}>
              <span key={`${i}-name`}>Name: {user.name} | </span>
              <span key={`${i}-uid`}>uid: {user.uid} | </span>
              <span key={`${i}-pass`}>pass: {user.pass} | </span>
              <span key={`${i}-faculty`}>faculty: {user.faculty}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
