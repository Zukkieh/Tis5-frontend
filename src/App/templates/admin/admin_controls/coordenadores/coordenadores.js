import React, { Component } from 'react';
import { AdminService } from '../../../../services/adminService'

class Coordenadores extends Component {

    admService = new AdminService();


    constructor() {
        super();
        this.state = {
            updatable: false,
            coordinators: [],
            totalCoordinators: 0,
            paginationPages: [],
        }
    }


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

    }



    todosCoordenadores() {
        const response = new AdminService().listarCoordenadores(1, 1);
        response.then((r => {
            let total = r.data.total;
            this.setState({ totalCoordinators: total })
            this.paginationCoordinators(1, 5);

        }))
    }

    paginationCoordinators(page, limit) {
        try {
            document.getElementsByClassName('results_coordenador')[0].classList.add('show-loading')
        } catch (error) {

        }

        let response;


        if (limit == null) {
            limit = document.getElementById('pagination_per_view').value;
        }
        response = new AdminService().listarCoordenadores(page, limit);


        response.then((r => {
            this.setState({ coordinators: r.data.data })
            let total = r.data.total;

            let pagination = [];
            for (let i = 1; i <= Math.ceil(total / limit); i++) {
                pagination.push(i);
            }
            this.setState({ paginationPages: pagination })

            let pagesSize = document.getElementsByClassName("page").length;
            for (let i = 0; i < pagesSize; i++) {
                document.getElementsByClassName("page")[i].classList.remove("select")
            }
            document.getElementsByClassName(page)[0].classList.add('select')
            document.getElementsByClassName('results_coordenador')[0].classList.remove('show-loading')
        }))
    }



    cadastrarCoordenador() {
        document.getElementsByClassName("form-cadastro-coordenador")[0].classList.add("show-loading");
        let nome_coordenador = document.getElementById("nome_coordenador").value;
        let cod_pessoa_coordenador = document.getElementById("cod_pessoa_coordenador").value;
        let email_coordenador = document.getElementById("email_coordenador").value;
        let password_coordenador = document.getElementById("password_coordenador").value;

        let cadastro = this.admService.cadastrarCoordenador(nome_coordenador, cod_pessoa_coordenador, email_coordenador, password_coordenador);

        cadastro.then(res => {
            this.todosCoordenadores();
            this.hideFormCadastroCoordenador()
            document.getElementsByClassName("form-cadastro-coordenador")[0].classList.remove("show-loading");
            console.log(res.data)
        })

        cadastro.catch(error => {
            alert("Erro ao cadastrar coordenador: " + error.response.statusText);
            document.getElementsByClassName("form-cadastro-coordenador")[0].classList.remove("show-loading");
            console.log(error.response)

        })
    }

    alterarCoordenador() {
        document.getElementsByClassName("edit_coordinator")[0].classList.add("show-loading");
        let nome_coordenador = document.getElementById("edit_nome_coordenador").value;
        let password_coordenador = document.getElementById("edit_password_coordenador").value;
        let type = document.getElementById("edit_type").value;
        let user_id = document.getElementById("id_user").value;

        const alterar = new AdminService().alterarCoordenador(user_id, nome_coordenador, password_coordenador, type);
        alterar.then(r => {
            this.todosCoordenadores();
            document.getElementsByClassName("edit_coordinator")[0].classList.remove("show-loading");
            console.log(r)
            alert("Alterado com sucesso")
        })

        alterar.catch(error => {
            console.log(error)
            document.getElementsByClassName("edit_coordinator")[0].classList.remove("show-loading");
            alert("Erro ao aterar")
        })

    }



    setCoordinatorEdit(coordenador) {
        document.getElementsByClassName('results')[0].classList.add('hide');
        document.getElementsByClassName('pagination')[0].classList.add('hide');
        document.getElementsByClassName('control')[0].classList.add('hide');
        document.getElementsByClassName('edit')[0].classList.remove('hide');

        document.getElementById("edit_nome_coordenador").value = coordenador.name;
        document.getElementById("id_user").value = coordenador.user_id;
    }

    apagarCoordenador() {
        let nome = document.getElementById("edit_nome_coordenador").value;
        let id = document.getElementById("id_user").value;

        if (window.confirm("Você realmente deseja apagar o coordenador " + nome + " ?")) {
            document.getElementsByClassName('form')[0].classList.add('show-loading')
            const response = new AdminService().apagarCoordenador(id);
            response.then(r => {
                console.log(r.data)
                alert("O coordenador " + nome + " foi apagado!")
                this.todosCoordenadores()
                this.closeEditingCoordinator()
                document.getElementsByClassName('form')[0].classList.remove('show-loading')
            })
            response.catch(error => {
                console.log(error.response)
                document.getElementsByClassName('form')[0].classList.remove('show-loading')
            })
        }
    }




    closeEditingCoordinator() {
        document.getElementsByClassName('results')[0].classList.remove('hide');
        document.getElementsByClassName('pagination')[0].classList.remove('hide');
        document.getElementsByClassName('control')[0].classList.remove('hide');
        document.getElementsByClassName('edit')[0].classList.add('hide');
    }

    componentDidMount() {
        this.todosCoordenadores();
    }

    render() {
        return (
            <div id="coordenadores" className="admin_controls_comp">
                <div >
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



                                <a href="javascript:void(0)" onClick={() => this.hideFormCadastroCoordenador()} >Voltar</a>
                            </div>

                        </form>
                    </div>
                    <div className="hide edit_coordinator edit form">

                        <form>
                            <div className="header">
                                <p>Editar Coordenador</p>
                            </div>

                            <div className="body">
                                <div className="column">
                                    <label htmlFor="edit_nome_coordenador">Nome do coordenador</label>
                                    <input type="text" id="edit_nome_coordenador" placeholder="Coordenador" />
                                </div>
                                <div className="column">
                                    <label htmlFor="edit_password_coordenador">Senha</label>
                                    <input id="edit_password_coordenador" placeholder="Nova Senha" type="password" />
                                </div>
                                <div className="column">
                                    <label htmlFor="edit_type">Tipo</label>
                                    <select id="edit_type">
                                        <option>Coordenador(a)</option>
                                        <option>Aluno(a)</option>
                                    </select>
                                </div>

                                <input type="hidden" id="id_user" />

                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.alterarCoordenador()}>Alterar dados</button>
                                <button type="button" className="cancelar" onClick={() => this.apagarCoordenador()}>Apagar Coordenador</button>
                                <a onClick={() => this.closeEditingCoordinator()} href="javascript:void(0)">Voltar</a>
                            </div>
                        </form>

                    </div>
                    <div className="results results_coordenador">
                        <div className="result_item_title">
                            <div><strong>Nome</strong></div>
                            <div><strong>Código de pessoa</strong></div>
                        </div>
                        {


                            this.state.coordinators.map((coordenador) => (

                                <div className="result_item" onClick={() => this.setCoordinatorEdit(coordenador)}>
                                    <div>{coordenador.name}</div>
                                    <div>{coordenador.person_code}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo </p>
                            <select onChange={() => this.paginationCoordinators(1)} id="pagination_per_view">
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                            </select>
                            <p>por página</p>
                        </div>
                        <div className="page_select">
                            <span>Páginas:</span>
                            <a className="page"></a>
                            {
                                this.state.paginationPages.map((page) => (
                                    <div>
                                        <a href="javascript:void(0)" onClick={() => this.paginationCoordinators(page)} className={page + " page"} >  {page} </a>
                                        <a className="separator"></a>
                                    </div>
                                ))
                            }

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