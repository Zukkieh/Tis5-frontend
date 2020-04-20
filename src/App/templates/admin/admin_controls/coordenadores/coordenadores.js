import React, { Component } from 'react';
import { AdminService } from '../../../../services/adminService'

class Coordenadores extends Component {

    admService = new AdminService();
    listCoordinators = [];




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

        this.showAllCordenadores();

    }

    async cadastrarCoordenador() {
        document.getElementsByClassName("form-cadastro-coordenador")[0].classList.add("show-loading");
        let nome_coordenador = document.getElementById("nome_coordenador").value;
        let cod_pessoa_coordenador = document.getElementById("cod_pessoa_coordenador").value;
        let email_coordenador = document.getElementById("email_coordenador").value;
        let password_coordenador = document.getElementById("password_coordenador").value;

        let cadastro = this.admService.cadastrarCoordenador(nome_coordenador, cod_pessoa_coordenador, email_coordenador, password_coordenador);

        cadastro.then(res => {
            this.listCoordinators = []
            this.showAllCordenadores();
            this.hideFormCadastroCoordenador()
            document.getElementsByClassName("form-cadastro-coordenador")[0].classList.remove("show-loading");
            console.log(res.data)
        })

        cadastro.catch(error => {
            alert("Erro ao cadastrar coordenador: " + error.response);
            console.log(error.response)
        })

    }




    showAllCordenadores() {
        let title_result = `<div class="result_item_title">
                                <div><strong>Nome</strong></div>
                                <div><strong>Código de pessoa</strong></div>
                            </div>`;
        let div_results = document.getElementsByClassName("results_coordenador")[0];

        if (this.listCoordinators.length == 0) {
            div_results.classList.add('show-loading')
            let result = this.admService.listarCoordenadores()
            result.then(res => {
                this.listCoordinators = res.data;
                let allCoordenadores = this.listCoordinators
                div_results.innerHTML = '';
                div_results.innerHTML += title_result;
                for (let i = 0; i < allCoordenadores.length && i < 5; i++) {
                    let resultItem;
                    if (i % 2 == 0) {
                        resultItem = `<div class="result_item strip"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                    } else {
                        resultItem = `<div class="result_item"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                    }

                    div_results.innerHTML += resultItem
                }
                div_results.classList.remove('show-loading')
                let showing_results = document.getElementById("showing_results");
                let total_results = document.getElementById("total_results");

                showing_results.innerText = 5;
                total_results.innerText = this.listCoordinators.length;
                console.log(res.data)
            })
            result.catch(error => {
                console.log("Erro ao exibir todos os coordenadores: " + error.response)
            })

        } else {

            let div_results = document.getElementsByClassName("results_coordenador")[0];
            let allCoordenadores = this.listCoordinators
            div_results.innerHTML = '';
            div_results.innerHTML += title_result;
            for (let i = 0; i < allCoordenadores.length; i++) {
                let resultItem;
                if (i % 2 == 0) {
                    resultItem = `<div class="result_item strip"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                } else {
                    resultItem = `<div class="result_item"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                }

                div_results.innerHTML += resultItem
            }

        }
    }


    componentDidMount() {
        this.showAllCordenadores();

    }

    render() {

        return (

            <div className="admin_controls_comp">
                <div id="coordenadores">
                    <div className="control ">
                        <div className="icon fa-search">
                            <input onKeyDown={() => this.pesquisaCoordenador()} placeholder="Pesquise um coordenador" />
                        </div>
                        <div className="icon fa-filter">
                            <select>
                                <option value="all">Todos coordenadores</option>
                            </select>
                        </div>
                        <div className="icon fa-plus div-btn-show-form-cadastro-coordenador">
                            <button onClick={() => this.showFormCadastroCoordenador()}>Novo coordernador</button>
                        </div>


                    </div>
                    <div className="results results_coordenador">
                        <div className="result_item_title">
                            <div><strong>Nome</strong></div>
                            <div><strong>Código de pessoa</strong></div>
                        </div>
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
                                    <label htmlFor="cod_pessoa_coordenador">Código de pessoa</label>
                                    <input id="cod_pessoa_coordenador" placeholder="Código de pessoa" />
                                </div>
                                <div className="column">
                                    <label htmlFor="email_coordenador">Email</label>
                                    <input id="email_coordenador" type="email" placeholder="Emai" />
                                    <label htmlFor="password_coordenador">Senha (123456)</label>
                                    <input id="password_coordenador" value="123456" onChange={() => console} placeholder="123456" type="password" />
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarCoordenador()}>Cadastrar</button>

                                <button type="button" className="cancelar" onClick={() => this.hideFormCadastroCoordenador()}>Cancelar</button>

                            </div>

                        </form>
                    </div>

                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo <span id="showing_results">0</span> de <span id="total_results">0</span> resultados.</p>
                        </div>
                        <div className="page_select">
                            <p> <a>1</a> - <a>2</a> - <a>3</a> </p>
                        </div>
                        <div className="nothing">

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Coordenadores;