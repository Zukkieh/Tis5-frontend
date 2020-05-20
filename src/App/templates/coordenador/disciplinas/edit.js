import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'


class Edit_disciplina extends Component {

    constructor() {
        super();
        this.state = {
            nome: "",
            turno: "",
            ativo: "",
        }
    }


    carregarDisciplina() {
        let response = new CoordenadorService().carregarDisciplina(this.props.id);
        document.getElementById("view_disciplinas").classList.add("show-loading")
        response.then(res => {
            this.setState({ nome: res.data.name })
            this.setState({ turno: res.data.shift })
            this.setState({ ativo: res.data.active })

            document.getElementById("view_disciplinas").classList.remove("show-loading")
        })
    }

    atualizarDisciplina() {
        let response = new CoordenadorService().alterarDisciplina(this.props.id, this.state.nome, this.state.turno, this.state.ativo)
        document.getElementById("view_disciplinas").classList.add("show-loading")
        response.then(res => {
            alert("Disciplina atualizada!")
            document.getElementById("view_disciplinas").classList.remove("show-loading")
        })
    }

    componentDidMount() {
        this.carregarDisciplina()
    }

    render() {

        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>
                    <div className="form form-edit-disciplina">
                        <form>
                            <div className="header">
                                <p>Alterar Disciplina</p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="name">Disciplina</label>
                                    <input id="name" value={this.state.nome} onChange={e => this.setState({ nome: e.target.value })} placeholder="Nome da disciplina" />
                                </div>
                                <div className="column">
                                    <label htmlFor="turno">Turno</label>
                                    <select id="turno" value={this.state.turno} onChange={e => this.setState({ turno: e.target.value })}>
                                        <option>Manhã</option>
                                        <option>Tarde</option>
                                        <option>Noite</option>
                                    </select>
                                </div>

                                <div className="column">
                                    <label htmlFor="active">Situação</label>
                                    <select id="active" value={this.state.ativo} onChange={e => this.setState({ ativo: e.target.value })}>
                                        <option value="true">Ativa</option>
                                        <option value="false">Desativada</option>
                                    </select>
                                </div>
                                <input type="hidden" id={this.props.id} />

                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.atualizarDisciplina()}>Alterar dados</button>
                                <button className="monitores" type="button" onClick={() => window.open("monitores/", "_self")} >Gerenciar monitores</button>
                                <a href="javascript:void(0)" onClick={() => window.open("/coordenador/disciplinas", "_self")} >Voltar</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default Edit_disciplina;