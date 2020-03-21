import React, { Component } from 'react';

import './login.scss'

import Logo from '../components/logo/logo'

class login extends Component {
  render() {
    return (
      <div className="container">
        <Logo />

        <div className="login">
          <p className="title">Faça Login</p>
          <div className="form">
            <div className="icon-user">
              <input placeholder="Matrícula" />
            </div>

            <div className="icon-lock">
              <input placeholder="Senha" type="password" />
            </div>

            <button>Logar</button>

            <div className="cadastroLink" onClick={()=> window.open("/cadastro","_self")}>

              <a to="/cadastro">Crie sua conta </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default login;
