import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class New_monitor extends Component {

    constructor() {
        super();
        this.state = {
            Alunos: [],
            idAluno: "",
            workLoad: "",
            disciplinaName: "",
        }
    }

    listarAlunos() {
        let response = new CoordenadorService().listarAlunos(localStorage.getItem("course_id"));
        response.then(res => {
            this.setState({ Alunos: res.data.data })
        })
    }


    cadastrarMonitor() {

        document.getElementById("view_disciplinas").classList.add("show-loading")
        let response = new CoordenadorService().cadastrarMonitor(this.props.id, this.state.idAluno, this.state.workLoad);

        response.then(res => {
            alert("Monitor cadastrado")
            window.open("/coordenador/disciplinas/" + this.props.id + "/monitores/", "_self")
        })
        response.catch(err => {
            console.log(err.response)
            alert(err.response.data.errors[0].message)
            document.getElementById("view_disciplinas").classList.remove("show-loading")
        })

    }

    componentDidMount() {
        let response = new CoordenadorService().carregarDisciplina(this.props.id)
        response.then(res => {
            this.setState({ disciplinaName: res.data.name })
        })
        this.listarAlunos()
    }

    render() {
        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>

                    <div className=" form form-cadastro-monitor">
                        <form>
                            <div className="header">
                                <p>Novo monitor de <span>{this.state.disciplinaName}</span></p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="workLoad">Carga horária</label>
                                    <select id="workload" value={this.state.workLoad} onChange={(e) => this.setState({ workLoad: e.target.value })} >
                                        <option></option>
                                        <option>10</option>
                                        <option>20</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label htmlFor="student">Aluno</label>
                                    <select id="student" value={this.state.idAluno} onChange={(e) => this.setState({ idAluno: e.target.value })}>
                                        <option></option>
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

                                <a href="javascript:void(0)" onClick={() => window.open("/coordenador/disciplinas/" + this.props.id + "/monitores/", "_self")} >Voltar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default New_monitor;