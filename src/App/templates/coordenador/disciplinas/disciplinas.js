import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Disciplinas extends Component {

    constructor() {
        super();
        this.state = {
            course_id: localStorage.getItem("course_id"),
            Disciplinas: [],
            paginationPages: [],
            Monitores: [],
            Alunos: []
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




    showMonitores() {
        document.getElementsByClassName("form-edit-disciplina")[0].classList.add("hide")
        document.getElementsByClassName("div_monitores")[0].classList.remove("hide")
        let nameDisc = document.getElementById("edit_name").value;
        document.getElementById("disciplina_monitor").innerHTML = nameDisc;
        this.listarMonitores();
    }

    hideMonitores() {
        document.getElementsByClassName("form-edit-disciplina")[0].classList.remove("hide")
        document.getElementsByClassName("div_monitores")[0].classList.add("hide")
    }

    listarMonitores() {
        let disciplina_id = document.getElementById("disciplina_id").value;
        let response = new CoordenadorService().listarMonitores(disciplina_id);
        document.getElementsByClassName("results_monitores")[0].classList.add("show-loading")
        response.then(res => {
            this.setState({ Monitores: res.data.data })
            console.log(res.data)
            if (res.data.total == 0) {
                alert("Essa disciplina ainda não possui monitores")
            }
            document.getElementsByClassName("results_monitores")[0].classList.remove("show-loading")
        })
    }

    listarAlunos() {
        let response = new CoordenadorService().listarAlunos(localStorage.getItem("course_id"));

        response.then(res => {
            this.setState({ Alunos: res.data.data })
        })
    }


    cadastrarMonitor() {
        let id_student = document.getElementById("student").value;
        let workLoad = document.getElementById("workload").value;
        let disciplina_id = document.getElementById("disciplina_id").value;

        let response = new CoordenadorService().cadastrarMonitor(disciplina_id, id_student, workLoad);

        response.then(res => {
            this.showMonitores();
            this.hideFormCadastroMonitor();
        })
        response.catch(err => {
            console.log(err.response)
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
                            <button onClick={() => window.open("/coordenador/disciplina/nova", "_self")}>Nova disciplina</button>
                        </div>
                    </div>
                    <div className="results results_disciplinas">
                        <div className="result_item_title">
                            <div><strong>Disciplina</strong></div>
                            <div><strong>Turno</strong></div>
                        </div>
                        {this.state.Disciplinas.map((disciplina) => (
                            <a href={"disciplinas/" + disciplina.id + "/"} target="_self" className="result_item">
                                <div>{disciplina.name}</div>
                                <div>{disciplina.shift}</div>
                            </a>
                        ))}
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
                                <button onClick={() => this.showFormCadastroMonitor()}>Novo monitor</button>
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
                    <div className="hide form form-cadastro-monitor">
                        <form>
                            <div className="header">
                                <p>Novo monitor de <span id="disciplina_nome_cadastro"></span></p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="workLoad">Carga horária</label>
                                    <select id="workload">
                                        <option>10</option>
                                        <option>20</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label htmlFor="student">Aluno</label>
                                    <select id="student">
                                        {
                                            this.state.Alunos.map((aluno) => {
                                                if (!aluno.is_monitor)
                                                    return <option value={aluno.id} >{aluno.name}</option>
                                            }
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarMonitor()}>Cadastrar</button>

                                <a href="javascript:void(0)" onClick={() => this.hideFormCadastroMonitor()} >Voltar</a>
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