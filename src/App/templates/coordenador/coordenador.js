import React, { Component } from 'react';
import './coordenador.scss'
import Logo from '../components/logo/logo'
import Coordenador_Conta from './coordenador_conta/conta';
import Disciplinas from './disciplinas/disciplinas';

class Coordenador extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
        }
    }

    logout() {
        localStorage.clear();
        window.open("/login", "_self")
    }

    showUserOpcoes() {
        document.getElementById("opcoes").classList.toggle("hide");
    }

    clickConta() {
        document.getElementsByClassName("item-coordenador-conta")[0].classList.add("active");
        document.getElementsByClassName("item-coordenador-disciplina")[0].classList.remove("active");
        document.getElementById("view_conta").classList.remove("hide")
        document.getElementById("view_disciplinas").classList.add("hide")
    }

    clickDisciplinas() {
        document.getElementsByClassName("item-coordenador-conta")[0].classList.remove("active");
        document.getElementsByClassName("item-coordenador-disciplina")[0].classList.add("active");
        document.getElementById("view_conta").classList.add("hide")
        document.getElementById("view_disciplinas").classList.remove("hide")
    }

    componentDidMount() {
        window.addEventListener("click", function (event) {
            if (event.target.parentNode.parentNode !== this.document.getElementsByClassName("user")[0]) {
                this.document.getElementById("opcoes").classList.add("hide");
            }
        })

        if (localStorage.getItem("type_user") != "Coordenador(a)") {
            alert("Você não tem autorização para acessar essa página")
            window.history.back()
        }


        let id = localStorage.getItem("id")
        let token = localStorage.getItem("token");
        let name = localStorage.getItem("name");
        let user_id = localStorage.getItem("user_id")

        this.setState({ name: name })

    }

    render() {




        return (
            <div className="admin">
                <div className="admin_banner">

                    <Logo />

                    <div className="title">
                        Coordenador
                    </div>
                    <div className="user" onClick={() => this.showUserOpcoes()}>
                        <div>
                            <i className="fa-user" />
                        </div>
                        <div id="adm-op" >
                            <p id="name_coordenador">{this.state.name}</p>
                            <div id="opcoes" className="hide">
                                <div onClick={() => this.logout()}>
                                    sair
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="aside">
                        <div className="title">
                            <p>Opções do Coordenador</p>
                        </div>
                        <div className="item item-coordenador-disciplina active" onClick={() => this.clickDisciplinas()} >
                            <p>Gerenciar Disciplinas</p>
                        </div>
                        <div className="item item-coordenador-conta" onClick={() => this.clickConta()} >
                            <p>Minha Conta</p>
                        </div>
                    </div>

                    <div className="main admin_controls">
                        <Disciplinas />
                        <Coordenador_Conta />
                    </div>
                </div>

            </div>
        );
    }
}

export default Coordenador;
