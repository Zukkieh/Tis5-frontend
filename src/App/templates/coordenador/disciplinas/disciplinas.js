import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Disciplinas extends Component {

    constructor() {
        super();
        this.state = {
            course_id: localStorage.getItem("course_id"),
            Disciplinas: [],
            paginationPages: [],
            Monitores: []
        }
        console.clear()

    }

    listarDisciplinas() {
        const response = new CoordenadorService().listarDisciplina(this.state.course_id, 1, 1);

        response.then(res => {
            console.log(res.data)
            this.paginacaoDisciplina(1);
        })

        response.catch(error => {
            if (localStorage.getItem("course_id" != null)) {
                alert("Erro ao listar disciplinas")
            }

            console.log(error.response)
        })

        document.getElementById("course_name").innerHTML = localStorage.getItem("course")
    }

    paginacaoDisciplina(page, limit) {

        try {
            document.getElementsByClassName("results_disciplinas")[0].classList.add("show-loading")
        } catch (error) {

        }

        if (limit == null) {
            limit = document.getElementById("pagination_per_view").value;
        }
        const response = new CoordenadorService().listarDisciplina(this.state.course_id, page, limit);

        response.then((r => {
            this.setState({ Disciplinas: r.data.data })
            let total = r.data.total;

            let pagination = [];
            for (let i = 1; i <= Math.ceil(total / limit); i++) {
                pagination.push(i);
            }
            if (pagination.length == 0) {
                pagination.push(1);
            }
            this.setState({ paginationPages: pagination })
            let pagesSize = document.getElementsByClassName("page").length;
            for (let i = 0; i < pagesSize; i++) {
                document.getElementsByClassName("page")[i].classList.remove("select")
            }

            document.getElementsByClassName(page)[0].classList.add("select")
            document.getElementsByClassName("results_disciplinas")[0].classList.remove("show-loading")



        }))

        response.catch(error => {
            console.log(error.response)
            try {
                document.getElementsByClassName("results_disciplinas")[0].classList.remove("show-loading")
            } catch (error) {

            }
        })
    }

    cadastrarDisciplina() {
        let nome = document.getElementById("name").value;
        let turno = document.getElementById("turno").value;
        document.getElementsByClassName("form-cadastro-disciplina")[0].classList.add("show-loading");

        const response = new CoordenadorService().cadastrarDisciplina(nome, turno);
        response.then(res => {
            alert("Disicplina Cadastrada")
            document.getElementById("name").value = "";
            document.getElementsByClassName("form-cadastro-disciplina")[0].classList.remove("show-loading");
            this.paginacaoDisciplina(1, null)
            this.hideCadastroDisciplina();
        })

        response.catch(error => {
            alert(error.response.data.errors[0].message);
            console.log(error.response)
            document.getElementsByClassName("form-cadastro-disciplina")[0].classList.remove("show-loading");
        })

    }

    editarDisciplina() {
        let name = document.getElementById("edit_name").value
        let turno = document.getElementById("edit_turno").value
        let active = document.getElementById("active").value
        let id = document.getElementById("disciplina_id").value

        document.getElementsByClassName("form-edit-disciplina")[0].classList.add("show-loading");

        const response = new CoordenadorService().alterarDisciplina(id, name, turno, active);

        response.then(res => {
            alert("Disciplina alterada")
            document.getElementsByClassName("form-edit-disciplina")[0].classList.remove("show-loading");
            this.listarDisciplinas();
            this.hideEditDisciplina();
        })

        response.catch(error => {
            alert("Não foi possível alterar essa disciplina")
            console.log(error.response)
        })

    }

    showCadastroDisciplina() {
        document.getElementsByClassName("control")[0].classList.add("hide");
        document.getElementsByClassName("results_disciplinas")[0].classList.add("hide");
        document.getElementsByClassName("pagination")[0].classList.add("hide")
        document.getElementsByClassName("form-cadastro-disciplina")[0].classList.remove("hide");
    }

    hideCadastroDisciplina() {
        document.getElementsByClassName("control")[0].classList.remove("hide");
        document.getElementsByClassName("results_disciplinas")[0].classList.remove("hide");
        document.getElementsByClassName("pagination")[0].classList.remove("hide")
        document.getElementsByClassName("form-cadastro-disciplina")[0].classList.add("hide");
    }

    showEditDisciplina(disciplina) {
        document.getElementsByClassName("control")[0].classList.add("hide");
        document.getElementsByClassName("results_disciplinas")[0].classList.add("hide");
        document.getElementsByClassName("pagination")[0].classList.add("hide")
        document.getElementsByClassName("form-edit-disciplina")[0].classList.remove("hide");

        console.log(disciplina)

        document.getElementById("edit_name").value = disciplina.name;
        document.getElementById("edit_turno").value = disciplina.shift;
        document.getElementById("active").value = disciplina.active;
        document.getElementById("disciplina_id").value = disciplina.id;

    }
    hideEditDisciplina() {
        document.getElementsByClassName("control")[0].classList.remove("hide");
        document.getElementsByClassName("results_disciplinas")[0].classList.remove("hide");
        document.getElementsByClassName("pagination")[0].classList.remove("hide")
        document.getElementsByClassName("form-edit-disciplina")[0].classList.add("hide");


        document.getElementById("edit_name").value = ""
        document.getElementById("edit_turno").value = ""
        document.getElementById("active").value = ""
        document.getElementById("disciplina_id").value = ""

    }

    showMonitores(){
        document.getElementsByClassName("form-edit-disciplina")[0].classList.add("hide")
        document.getElementsByClassName("div_monitores")[0].classList.remove("hide")
        let nameDisc = document.getElementById("edit_name").value;
        document.getElementById("disciplina_monitor").innerHTML = nameDisc;
        this.listarMonitores();
    }

    hideMonitores(){
        document.getElementsByClassName("form-edit-disciplina")[0].classList.remove("hide")
        document.getElementsByClassName("div_monitores")[0].classList.add("hide")
    }

    listarMonitores(){
        let disciplina_id = document.getElementById("disciplina_id").value;
        let response = new CoordenadorService().listarMonitores(disciplina_id);

        response.then(res =>{
            this.setState({Monitores:res.data.data})
            console.log(res.data.data)
        })



    }

    componentDidMount() {
        this.listarDisciplinas();
    }

    render() {
        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>
                    <div className="control ">

                        <div>
                            <p>Listando disciplinas de <strong><span id="course_name"></span></strong></p>
                        </div>
                        <div className="icon fa-plus div-btn-show-form-cadastro-coordenador">
                            <button onClick={() => this.showCadastroDisciplina()}>Nova disciplina</button>
                        </div>
                    </div>
                    <div className="results results_disciplinas">
                        <div className="result_item_title">
                            <div><strong>Disciplina</strong></div>
                            <div><strong>Turno</strong></div>
                        </div>
                        {this.state.Disciplinas.map((disciplina) => (
                            <div className="result_item" onClick={() => this.showEditDisciplina(disciplina)}>
                                <div>{disciplina.name}</div>
                                <div>{disciplina.shift}</div>
                            </div>
                        ))}
                    </div>
                    <div className="hide form form-edit-disciplina">
                        <form>
                            <div className="header">
                                <p>Alterar Disciplina</p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="edit_name">Disciplina</label>
                                    <input id="edit_name" placeholder="Nome da disciplina" />
                                </div>
                                <div className="column">
                                    <label htmlFor="edit_turno">Turno</label>
                                    <select id="edit_turno">
                                        <option>Manhã</option>
                                        <option>Tarde</option>
                                        <option>Noite</option>
                                    </select>
                                </div>

                                <div className="column">
                                    <label htmlFor="active">Situação</label>
                                    <select id="active">
                                        <option value="true">Ativa</option>
                                        <option value="false">Desativada</option>
                                    </select>
                                </div>
                                <input type="hidden" id="disciplina_id" />

                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.editarDisciplina()}>Alterar dados</button>
                                <button className="monitores" type="button" onClick={() => this.showMonitores()} >Gerenciar monitores</button>
                                <a href="javascript:void(0)" onClick={() => this.hideEditDisciplina()} >Voltar</a>
                            </div>
                        </form>
                    </div>
                    <div className="hide div_monitores">
                        <div className="control_monitor">
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.hideMonitores()}>Voltar</a>
                            </div>
                            <div>
                                <p>Listando os monitores de  <strong><span id="disciplina_monitor"></span></strong></p>
                            </div>
                            <div className="icon fa-plus div-btn-show-form-cadastro-coordenador">
                                <button >Novo monitor</button>
                            </div>
                        </div>
                        <div className="results results_monitores">
                            <div className="result_item_title">
                                <div><strong>Monitor</strong></div>
                                <div><strong>Cód. pessoa</strong></div>
                            </div>
                            {
                                
                            this.state.Monitores.map((monitor) => (
                                <div className="result_item">
                                    <div>{monitor.student.user.name}</div>
                                    <div>{monitor.student.user.person_code}</div>
                                </div>
                            ))
                            
                            }
                        </div>
                    </div>
                    <div className="hide form form-cadastro-disciplina">
                        <form>
                            <div className="header">
                                <p>Nova Disciplina</p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="name">Disciplina</label>
                                    <input id="name" placeholder="Nome da disciplina" />
                                </div>
                                <div className="column">
                                    <label htmlFor="turno">Turno</label>
                                    <select id="turno">
                                        <option>Manhã</option>
                                        <option>Tarde</option>
                                        <option>Noite</option>
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarDisciplina()}>Cadastrar</button>

                                <a href="javascript:void(0)" onClick={() => this.hideCadastroDisciplina()} >Voltar</a>
                            </div>
                        </form>
                    </div>
                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo </p>
                            <select id="pagination_per_view" onChange={() => this.paginacaoDisciplina(1)}>
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
                                        <a href="javascript:void(0)" onClick={() => this.paginacaoDisciplina(page)} className={page + " page"} >  {page} </a>
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

export default Disciplinas;