import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Monitores extends Component {

    constructor() {
        super();
        this.state = {
            Monitores: [],
            disciplinaName: "",
        }
    }
    listarMonitores() {

        let response = new CoordenadorService().listarMonitores(this.props.id);
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


    componentDidMount() {
        let response = new CoordenadorService().carregarDisciplina(this.props.id)
        response.then(res => {
            this.setState({ disciplinaName: res.data.name })
        })
        this.listarMonitores()
    }

    render() {
        return (
            <div id="view_disciplinas" className="admin_controls_comp">
                <div>
                    <div className=" div_monitores">
                        <div className="control_monitor">
                            <div>
                                <a href="javascript:void(0)" onClick={() => window.open("/coordenador/disciplinas/" + this.props.id + "/", "_self")}>Voltar</a>
                            </div>
                            <div>
                                <p>Listando os monitores de  <strong>{this.state.disciplinaName}</strong></p>
                            </div>
                            <div className="icon fa-plus div-btn-show-form-cadastro-coordenador">
                                <button onClick={() => window.open("novo", "_self")}>Novo monitor</button>
                            </div>
                        </div>
                        <div className="results results_monitores">
                            <div className="result_item_title">
                                <div><strong>Monitor</strong></div>
                                <div><strong>Cód. pessoa</strong></div>
                            </div>
                            {

                                this.state.Monitores.map((monitor) => (
                                    <div className="result_item" onClick={() => window.open("details/" + monitor.id, "_self")}>
                                        <div>{monitor.student.user.name}</div>
                                        <div>{monitor.student.user.person_code}</div>
                                    </div>
                                ))

                            }
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Monitores;