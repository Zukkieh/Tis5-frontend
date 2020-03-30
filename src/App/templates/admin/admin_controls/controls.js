import React, { Component } from 'react';
import './controls.scss'
class admin_controls extends Component {
    showFormCadastroCoordenador() {
        document.getElementsByClassName('form-cadastro-coordenador')[0].classList.remove('hide');
        document.getElementsByClassName('results')[0].classList.add('hide');
        document.getElementsByClassName('pagination')[0].classList.add('hide');
        document.getElementsByClassName('control')[0].classList.add('hide');
    }

    hideFormCadastroCoordenador() {
        document.getElementsByClassName('form-cadastro-coordenador')[0].classList.add('hide');
        document.getElementsByClassName('results')[0].classList.remove('hide');
        document.getElementsByClassName('pagination')[0].classList.remove('hide');
        document.getElementsByClassName('control')[0].classList.remove('hide');
    }

    pesquisaCoordenador() {

        document.getElementsByClassName('results')[0].classList.add('show-loading');


    }

    render() {
        return (
            <div className="admin_controls">
                <div id="coordenadores">
                    <div className="control ">
                        <div className="icon fa-search">
                            <input onKeyDown={() => this.pesquisaCoordenador()} placeholder="Pesquise um coordenador" />
                        </div>
                        <div className="icon fa-filter">
                            <select>
                                <option value="all">Todos coordenadores</option>
                                <option value="">Ativos</option>
                                <option value="">Desativados</option>
                            </select>
                        </div>
                        <div className="icon fa-plus div-btn-show-form-cadastro-coordenador">
                            <button onClick={() => this.showFormCadastroCoordenador()}>Novo coordernador</button>
                        </div>


                    </div>
                    <div className="results">

                    </div>

                    <div className="hide form form-cadastro-coordenador">
                        <form>
                            <div className="header">
                                <p>Cadastro de coordenador</p>
                            </div>

                            <div className="body">
                                <div className="column">
                                    <label htmlFor="nome_coordenador">Nome do coordenador</label>
                                    <input id="nome_coordenador" placeholder="Coordenador" />
                                    <label htmlFor="matricula_coordenador">Matrícula</label>
                                    <input id="matricula_coordenador" placeholder="Matrícula" />
                                    <label htmlFor="curso_coordenador">Curso do coordernador</label>
                                    <select id="curso_coordenador">
                                        <option value="disabled">Selecione um curso</option>

                                    </select>
                                </div>
                                <div className="column">
                                    <label htmlFor="nome_coordenador">Nome do coordenador</label>
                                    <input id="nome_coordenador" placeholder="Coordenador" />
                                    <label htmlFor="matricula_coordenador">Matrícula</label>
                                    <input id="matricula_coordenador" placeholder="Matrícula" />
                                    <label htmlFor="curso_coordenador">Curso do coordernador</label>
                                    <select id="curso_coordenador">
                                        <option value="disabled">Selecione um curso</option>

                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar">Cadastrar</button>

                                <button type="button" className="cancelar" onClick={() => this.hideFormCadastroCoordenador()}>Cancelar</button>

                            </div>

                        </form>
                    </div>

                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo todos os coordenadores</p>
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