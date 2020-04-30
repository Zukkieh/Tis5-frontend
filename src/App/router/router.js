import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import login from '../templates/login/login';
import cadastro from '../templates/cadastro/cadastro';
import admin from '../templates/admin/admin';
import coodernador from '../templates/coordenador/coordenador';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/cadastro" component={cadastro} />
        <Route exact path="/login" component={login} />
        <Route exact path="/admin" component={admin} />
        <Route exact path="/coordenador" component={coodernador} />
      </Router>
    );
  }
}

export default Routes;
