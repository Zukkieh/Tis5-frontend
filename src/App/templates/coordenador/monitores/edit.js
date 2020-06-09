import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Edit_monitor extends Component {

    constructor() {
        super();
        this.state = {
            Monitor: [],
            Aluno: [],
            Disciplina: [],
        }
    }



    apagarMonitor() {
        let apagar = window.confirm("Voce realmente deseja apagar o monitor " + this.state.Aluno.name)
        if (apagar) {
            document.getElementById("view_disciplinas").classList.add("show-loading")
            let response = new CoordenadorService().apagarMonitor(this.props.id_monitor);

            response.then(res => {
                alert("Monitor apagado")
                window.open("/coordenador/disciplinas/" + this.props.id_disciplina + "/monitores/", "_self")
            })
            response.catch(err => {
                console.log(err.response)
                alert(err.response.data.errors[0].message)
                document.getElementById("view_disciplinas").classList.remove("show-loading")
            })
        }
    }

    carregarAluno(id_student) {
        let response = new CoordenadorService().carregarAluno(id_student);
        response.then(res => {
            this.setState({ Aluno: res.data })
            console.log(res.data)
            document.getElementById("view_disciplinas").classList.remove("show-loading");
        })
    }

    carregarMonitor() {
        let response = new CoordenadorService().carregarMonitor(this.props.id_monitor);
        response.then(res => {
            this.setState({ Monitor: res.data })
            this.carregarAluno(res.data.student.id)
            console.log(res.data)
        })
    }

    carregarDisciplina() {
        document.getElementById("view_disciplinas").classList.add("show-loading");
        let response = new CoordenadorService().carregarDisciplina(this.props.id_disciplina)
        response.then(res => {
            this.setState({ Disciplina: res.data })
            console.log(res.data)
        })
    }

    componentDidMount() {
        this.carregarDisciplina()
        this.carregarMonitor()
    }

    render() {
        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>

                    <div className=" form form-cadastro-monitor">
                        <form>
                            <div className="header">
                                <p>{this.state.Disciplina.name} ({this.state.Disciplina.shift}) - Ficha do Monitor</p>
                            </div>
                            <div className="body">
                                <div className="ficha">
                                    <div className="item">
                                        <strong>Nome: </strong><span>{this.state.Aluno.name}</span>
                                    </div>
                                    <div className="item">
                                        <strong>E-mail: </strong><span>{this.state.Aluno.email}</span>
                                    </div>
                                    <div className="item">
                                        <strong>Telefone: </strong><span>{this.state.Aluno.phone}</span>
                                    </div>
                                </div>
                                <div className="ficha">
                                    <div className="item">
                                        <strong>Matrícula: </strong><span>{this.state.Aluno.registration}</span>
                                    </div>
                                    <div className="item">
                                        <strong>Cód. pessoa: </strong><span>{this.state.Aluno.person_code}</span>
                                    </div>
                                    <div className="item">
                                        <strong>Carga Horária: </strong><span>{this.state.Monitor.workload} horas semanais</span>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="monitores" type="button" onClick={() => window.open("relatorio", "_blank")}>Exibir Relatório</button>
                                <button className="cancelar" type="button" onClick={() => this.apagarMonitor()}>Apagar Monitor</button>
                                <a href="javascript:void(0)" onClick={() => window.open("/coordenador/disciplinas/" + this.props.id_disciplina + "/monitores/", "_self")} >Voltar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit_monitor;