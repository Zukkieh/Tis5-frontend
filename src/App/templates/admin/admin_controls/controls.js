import React, { Component } from 'react';
import axios from 'axios';
import './controls.scss'
import { AdminService } from '../../../services/adminService'

class admin_controls extends Component {
    admService = new AdminService();
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

        setTimeout(function () {
            document.getElementsByClassName('results')[0].classList.remove('show-loading');
        }, 1500)


    }

    async cadastrarCoordenador() {
        let nome_coordenador = document.getElementById("nome_coordenador").value;
        let cod_pessoa_coordenador = document.getElementById("cod_pessoa_coordenador").value;
        let email_coordenador = document.getElementById("email_coordenador").value;
        let password_coordenador = document.getElementById("password_coordenador").value;

        await axios.post("https://tis5-backend.herokuapp.com/coordinator", { person_code: cod_pessoa_coordenador, name: nome_coordenador, email: email_coordenador, password: password_coordenador }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } }).then(res => {
            console.log(res.data)
            console.log(cod_pessoa_coordenador)
            this.hideFormCadastroCoordenador()
            this.showAllCordenadores();
        }).catch(err => {
            console.log(err.response)
        })

    }

    async showAllCordenadores() {
        let div_results = document.getElementsByClassName("results_coordenador")[0];
        let result_itens = document.getElementsByClassName("result_item");
        for(let i = 0; i < result_itens.length; i++){
            result_itens[i].remove()
        }
        div_results.classList.add('show-loading')
       
        let result = this.admService.listarCoordenadores()

        result.then(res => {
            let allCoordenadores = res.data;


            for (let i = 0; i < allCoordenadores.length; i++) {
                let resultItem;
                if (i % 2 == 0) {
                    resultItem = `<div class="result_item strip"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                } else {
                    resultItem = `<div class="result_item"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                }

                div_results.innerHTML += resultItem
            }
            console.clear();
            console.log("Exibindo todos coordenadores abaixo")
            console.log(res.data)
            div_results.classList.remove('show-loading')
        })

        result.catch(error => {
            console.log("Erro ao exibir todos os coordenadores: " + error.response)
        })
    }

    componentDidMount() {
        this.showAllCordenadores();
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
                            <p>Exibindo todos os coordenadores</p>
                        </div>
                        <div className="page_select">
                            <p></p>
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