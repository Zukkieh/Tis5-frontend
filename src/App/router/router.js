import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import login from '../templates/login/login';
import cadastro from '../templates/cadastro/cadastro';
import admin from '../templates/admin/admin';
import coordenador_disciplinas from '../templates/coordenador/coordenador_disciplinas';
import coordenador_monitores from '../templates/coordenador/coordenador_monitores';
import coordenador_conta from '../templates/coordenador/coordenador_conta';
import Coordenador_disciplinas_edit from '../templates/coordenador/coordenador_disciplinas_edit'
import Coordenador_disciplinas_new from '../templates/coordenador/coordenador_disciplinas_new'
import Coordenador_monitores_new from '../templates/coordenador/coordenador_monitores_new'
import Coordenador_monitores_edit from '../templates/coordenador/coordenador_monitores_edit'
import Relatorio from '../templates/coordenador/monitores/relatorio';

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

        <Route exact path="/coordenador">
          <Redirect to="/coordenador/disciplinas" />
        </Route>

        <Route exact path="/coordenador/disciplinas" component={coordenador_disciplinas} />
        <Route exact path="/coordenador/conta" component={coordenador_conta} />
        <Route exact path="/coordenador/disciplinas/:id" component={Coordenador_disciplinas_edit} />
        <Route exact path="/coordenador/disciplina/nova" component={Coordenador_disciplinas_new} />
        <Route exact path="/coordenador/disciplinas/:id/monitores/" component={coordenador_monitores} />
        <Route exact path="/coordenador/disciplinas/:id/monitores/novo" component={Coordenador_monitores_new} />
        <Route exact path="/coordenador/disciplinas/:id/monitores/details/:id_monitor" component={Coordenador_monitores_edit} />
        <Route exact path="/coordenador/disciplinas/:id/monitores/details/:id_monitor/relatorio" component={Relatorio} />

      </Router>
    );
  }
}

export default Routes;
