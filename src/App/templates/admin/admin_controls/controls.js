import React, { Component } from 'react';
import axios from 'axios';
import './controls.scss';
import { AdminService } from '../../../services/adminService';
import Coordenadores from './coordenadores/coordenadores';

class admin_controls extends Component {
    admService = new AdminService();




    componentDidMount() {

    }

    render() {

        return (
            <div className="admin_controls">

                <Coordenadores />

                <div id="cursos" className="hide">
                    <div className="control">
                        <div className="icon fa-search">
                            <input placeholder="Pesquise um curso" />
                        </div>

                        <div className="icon fa-plus div-btn-show-form-cadastro-curso">
                            <button>Novo curso</button>
                        </div>
                    </div>
                    <div className="results">

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
        );

    }
}

export default admin_controls;