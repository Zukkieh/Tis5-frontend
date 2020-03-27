import React, { Component } from 'react';
import './admin.scss'
import Logo from '../components/logo/logo'
import Admin_Controls from './admin_controls/controls';

class admin extends Component {

    clickCursos(){
        document.getElementById("cursos").classList.remove("hide");
        document.getElementById("coordenadores").classList.add("hide");
    }

    clickCoordenadores(){
        document.getElementById("cursos").classList.add("hide");
        document.getElementById("coordenadores").classList.remove("hide");
        
    }
        
    render() {
        return (
            <div className="admin">
                <div className="admin_banner">

                    <Logo />

                    <div className="title">
                        Área Administrativa
                    </div>
                    <div className="user">
                        <div>
                            <i className="fa-user" />
                        </div>
                        <div>
                            <p>Administrador</p>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="aside">
                        <div className="title">
                            <p>Opções do Administrador</p>
                        </div>

                        <div className="item" onClick={() => this.clickCursos()}>
                            <p>Gerenciar Cursos</p>
                        </div>

                        <div className="item" onClick={() => this.clickCoordenadores()}>
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
