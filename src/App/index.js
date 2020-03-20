import React, { Component } from 'react';
import './App.scss'
import Routes from './router/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
