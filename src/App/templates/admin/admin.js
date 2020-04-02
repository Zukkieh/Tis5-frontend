import React, { Component } from 'react';
import './admin.scss'
import Logo from '../components/logo/logo'
import Admin_Controls from './admin_controls/controls';

class admin extends Component {

    clickCursos() {
        document.getElementById("cursos").classList.remove("hide");
        document.getElementById("coordenadores").classList.add("hide");
        document.getElementsByClassName("item-curso").item(0).classList.add("active");
        document.getElementsByClassName("item-coordenador").item(0).classList.remove("active");
    }

    clickCoordenadores() {
        document.getElementById("cursos").classList.add("hide");
        document.getElementById("coordenadores").classList.remove("hide");
        document.getElementsByClassName("item-curso").item(0).classList.remove("active");
        document.getElementsByClassName("item-coordenador").item(0).classList.add("active");

    }

    showUserOpcoes() {
        document.getElementById("opcoes").classList.toggle("hide");
    }

    logout(){
        localStorage.clear();
        window.open("/login","_self")
    }

    render() {

        window.addEventListener("click", function (event) {
            if (event.target.parentNode.parentNode !== this.document.getElementsByClassName("user")[0]) {
                this.document.getElementById("opcoes").classList.add("hide");
            }
        })

        if(localStorage.getItem("type_user") != "adm"){
            alert("Você não tem autorização para acessar essa página")
            window.history.back()
        }

        return (
            <div className="admin">
                <div className="admin_banner">

                    <Logo />

                    <div className="title">
                        Área Administrativa
                    </div>
                    <div className="user" onClick={() => this.showUserOpcoes()}>
                        <div>
                            <i className="fa-user" />
                        </div>
                        <div id="adm-op" >
                            <p>Administrador</p>
                            <div id="opcoes" className="hide">
                                <div onClick={()=> this.logout()}>
                                    sair
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="aside">
                        <div className="title">
                            <p>Opções do Administrador</p>
                        </div>
                        {/*
                        <div className="item item-curso" onClick={() => this.clickCursos()}>
                            <p>Gerenciar Cursos</p>
                        </div>

                        */}

                        <div className="item item-coordenador active" onClick={() => this.clickCoordenadores()}>
                            <p>Gerenciar Coordenadores</p>
                        </div>
                    </div>

                    <div className="main">
                        <Admin_Controls />
                    </div>
                </div>

            </div>
        );
    }
}

export default admin;
