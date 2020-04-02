import React, { Component } from 'react';
import './coordenador.scss'
import Logo from '../components/logo/logo'
import Coordenador_Controls from './coordenador_controls/controls';

import axios from 'axios'
class Coordenador extends Component {


    logout() {
        localStorage.clear();
        window.open("/login", "_self")
    }

    showUserOpcoes() {
        document.getElementById("opcoes").classList.toggle("hide");
    }


    render() {

        window.addEventListener("click", function (event) {
            if (event.target.parentNode.parentNode !== this.document.getElementsByClassName("user")[0]) {
                this.document.getElementById("opcoes").classList.add("hide");
            }
        })

        if (localStorage.getItem("type_user") != "Coordenador(a)") {
            alert("Você não tem autorização para acessar essa página")
            window.history.back()
        }


        let id = this.props.match.params.id;
        let token = localStorage.getItem("token");

        axios.get("https://tis5-backend.herokuapp.com/coordinator/"+id, {headers: { Authorization: "Bearer " +token }}).then(res => {
            document.getElementById("name_coordenador").innerHTML=res.data[0].name
            localStorage.setItem("id",res.data[0].id)
        }).catch(err => {
            try {
                alert(err.response.data[0].message)
            } catch (e) {
                alert(err.message)
            }
            console.log(err.response.data)
           
        })


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
                            <p id="name_coordenador"></p>
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
                        {/*
                        <div className="item item-curso" onClick={() => this.clickCursos()}>
                            <p>Gerenciar Cursos</p>
                        </div>

                        */}

                        <div className="item item-coordenador active" onClick={() => this.clickCoordenadores()}>
                            <p>Gerenciar Conta</p>
                        </div>
                    </div>

                    <div className="main">
                        <Coordenador_Controls />
                    </div>
                </div>

            </div>
        );
    }
}

export default Coordenador;
