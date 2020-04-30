import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Disciplinas extends Component {

    constructor() {
        super();
        this.state = {
            course_id: localStorage.getItem("course_id"),
            Disciplinas: [],
            paginationPages: [],
        }
        console.clear()

    }

    listarDisciplinas() {
        const response = new CoordenadorService().listarDisciplina(this.state.course_id, 1, 1);

        response.then(res => {
            console.log(res.data)
            this.paginacaoDisciplina(1, 5);
        })

        response.catch(error => {
            alert("Erro ao listar disciplinas")
            console.log(error.response)
        })
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
            this.setState({ paginationPages: pagination })
            let pagesSize = document.getElementsByClassName("page").length;
            for (let i = 0; i < pagesSize; i++) {
                document.getElementsByClassName("page")[i].classList.remove("select")
            }
            document.getElementsByClassName(page)[0].classList.add("select")

            console.log(r.data.data)


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
            alert("Erro ao cadastrar disciplina");
            console.log(error.response)
            document.getElementsByClassName("form-cadastro-disciplina")[0].classList.remove("show-loading");
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

    componentDidMount() {
        this.listarDisciplinas();
    }

    render() {
        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>
                    <div className="control ">
                        <div className="icon fa-search">
                            <input placeholder="Pesquise uma disciplina" />
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
                            <div className="result_item">
                                <div>{disciplina.name}</div>
                                <div>{disciplina.shift}</div>
                            </div>
                        ))}
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