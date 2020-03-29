import React, { Component } from 'react';
import './controls.scss'
class admin_controls extends Component {

    teste(){
        alert("a");
    }

    render() {
        return (
            <div className="admin_controls">
                <div id="coordenadores">
                    <div className="control ">
                        <div className="icon fa-search">
                            <input placeholder="Pesquise um coordenador" />
                        </div>
                        <div className="icon fa-filter">
                            <select>
                                <option value="all">Todos coordenadores</option>
                                <option value="">Ativos</option>
                                <option value="">Desativados</option>
                            </select>
                        </div>
                        <div className="icon fa-plus">
                            <button>Novo coordernador</button>
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

                <div id="cursos" className="hide">
                    <div className="control">
                        <div className="icon fa-search">
                            <input placeholder="Pesquise um curso" />
                        </div>
                        
                        <div className="icon fa-plus">
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