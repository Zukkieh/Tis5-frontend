import React, { Component } from 'react';
import './cadastro.scss'
import Logo from '../components/logo/logo'

class cadastro extends Component {
  render() {
    return (
      <div className="container">
        <Logo />

        <div className="cadastro">
          <p className="title">Cadastro</p>
          <div className="form">
            <div className="fa icon-id-card">
              <input placeholder="Nome Completo" />
            </div>
            <div className="fa icon-email">
              <input placeholder="Email" type="email" />
            </div>

            <div className="input-group">

              <div className="fa icon-user">
                <input placeholder="Cód. Pessoa" />
              </div>
              <div className="fa icon-user">
                <input placeholder="Matrícula" />
              </div>
            </div>

            <div className="fa icon-lock">
              <input placeholder="Senha" type="password" />
            </div>
            <div className="fa icon-lock">
              <input placeholder="Confirmar senha" type="password" />
            </div>

            <button>Finalizar Cadastro</button>

            <div className="loginLink" onClick={() => window.open("/login", "_self")}>

              <a>Já tenho uma conta</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default cadastro;
