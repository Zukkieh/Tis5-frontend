import React, { Component } from 'react';
import './admin.scss'
import Logo from '../components/logo/logo'

class admin extends Component {
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

                        <div className="item">
                            <p>Gerenciar Cursos</p>
                        </div>

                        <div className="item">
                            <p>Gerenciar Coordenadores</p>
                        </div>
                    </div>

                    <div className="main">
                        <div className="control">
                            <div className="icon fa-search">
                                <input placeholder="Pesquise um coordenador" />
                            </div>
                            <div className="icon fa-filter">
                                <select>
                                    <option selected>Todos coordenadores</option>
                                    <option>Coordenadores ativos</option>
                                    <option>Coordenadores desativados</option>
                                </select>
                            </div>
                            <div className="icon fa-plus">
                                <button>Novo coordernador</button>
                            </div>
                        </div>
                        <div className="content">

                        </div>
                        <div className="pagination">
                            <div className="total_results">
                                <p>Exibindo 3 de 3 resultados</p>
                            </div>
                            <div className="page_select">
                                <p> <strong>1</strong> - 2 - 3 - 4 - 5</p>
                            </div>
                            <div className="nothing">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default admin;
