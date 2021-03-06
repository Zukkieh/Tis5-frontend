import React, { Component } from 'react';
import axios from 'axios';
import { AdminService } from '../../services/adminService';

import './login.scss'

import Logo from '../components/logo/logo'

class login extends Component {

  async login() {

    let div_login = document.getElementsByClassName("login")[0];
    div_login.classList.add('show-loading')

    let person_code = document.getElementById("person_code").value;
    let password = document.getElementById("password").value;

    let body_req = {
      person_code: person_code,
      password: password
    }

    let config = {
      "headers": {
        Accept: "*",
        Host: "tis5-backend.herokuapp.com"
      }

    }

    //body_req = JSON.stringify(body_req);



    await axios.post("https://tis5-backend.herokuapp.com/auth", { person_code: person_code, password: password }).then(res => {
      console.log(res.data.user_type)
      if (res.data.user_type == null) {
        localStorage.setItem("type_user", "adm")
        localStorage.setItem("token", res.data.token)
        window.open('/admin', '_self')






      } else if (res.data.user_type == "Coordenador(a)") {
        localStorage.setItem("type_user", res.data.user_type)
        localStorage.setItem("token", res.data.token)
        try {
          localStorage.setItem("course_id", res.data.data.course.id)
        }
        catch (e) {

        }

        localStorage.setItem("id", res.data.data.id)
        localStorage.setItem("user_id", res.data.data.user_id)
        localStorage.setItem("name", res.data.data.name)


        let c = new AdminService().listarCursos(1, 99999);
        c.then(res2 => {

          let total = res2.data.total;


          for (let i = 0; i < total; i++) {
            if (res.data.data.course != null && res2.data.data[i].id == res.data.data.course.id) {
              localStorage.setItem("course", res2.data.data[i].name)
            }
          }
          if (res.data.data.course == null) {
            localStorage.setItem("course", "");
          }

          window.open('/coordenador/disciplinas ', '_self')
        })

      }

      div_login.classList.remove('show-loading')
    }).catch(err => {
      try {
        alert(err.response.data[0].message)
      } catch (e) {
        try {
          alert(err.response.data.message)
        } catch (e) {
          try {
            alert(err.message)
          } catch (e) {

          }
        }
      }
      console.log(err.response.data)
      div_login.classList.remove('show-loading')
    })

  }

  render() {
    return (
      <div className="container">
        <Logo />

        <div className="login">
          <p className="title">Faça Login</p>
          <div className="form">
            <div className="icon-user">
              <input id="person_code" placeholder="Cod. pessoa" />
            </div>

            <div className="icon-lock">
              <input id="password" placeholder="Senha" type="password" />
            </div>

            <button onClick={() => this.login()}>Logar</button>

            {
              /*
            <div className="cadastroLink" onClick={() => window.open("/cadastro", "_self")}>

              <a to="/cadastro">Crie sua conta </a>
            </div>
            */
            }
          </div>
        </div>
      </div>
    );
  }
}

export default login;
