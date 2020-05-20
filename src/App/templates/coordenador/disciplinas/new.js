import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'


class New_disciplina extends Component {

    constructor() {
        super();
        this.state = {
            nome: "",
            turno: "",
        }
    }


    cadastrarDisciplina() {
        let response = new CoordenadorService().cadastrarDisciplina(this.state.nome, this.state.turno)
        document.getElementById("view_disciplinas").classList.add("show-loading")
        response.then(res => {
            alert("Disciplina Cadastrada!")
            window.open("/coordenador/disciplinas", "_self")
            document.getElementById("view_disciplinas").classList.remove("show-loading")
        })
        response.catch(err => {
            console.log(err.response)
            alert(err.response.data.errors[0].message)
            document.getElementById("view_disciplinas").classList.remove("show-loading")
        })
    }

    componentDidMount() {

    }

    render() {

        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>
                    <div className="form form-edit-disciplina">
                        <form>
                            <div className="header">
                                <p>Nova Disciplina</p>
                            </div>
                            <div className="body">
                                <div className="column">
                                    <label htmlFor="name">Disciplina</label>
                                    <input id="name" value={this.state.nome} onChange={e => this.setState({ nome: e.target.value })} placeholder="Nome da disciplina" />
                                </div>
                                <div className="column">
                                    <label htmlFor="turno">Turno</label>
                                    <select id="turno" value={this.state.turno} onChange={e => this.setState({ turno: e.target.value })}>
                                        <option></option>
                                        <option>Manhã</option>
                                        <option>Tarde</option>
                                        <option>Noite</option>
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarDisciplina()}>Adicionar Disciplina</button>
                                <a href="javascript:void(0)" onClick={() => window.open("/coordenador/disciplinas", "_self")} >Voltar</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default New_disciplina;