import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import login from './templates/login/login';
import cadastro from './templates/cadastro/cadastro';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={login} />
        <Route exact path="/cadastro" component={cadastro} />
      </Router>
    );
  }
}

export default App;
