import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from 'react-bootstrap/Button';

import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>
          <Icon icon={accountIcon} />
          Test
        </Button>
      </header>
    </div>
  );
}

export default App;
