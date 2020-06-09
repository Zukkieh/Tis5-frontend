import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Relatorio extends Component {

    constructor() {
        super();
        this.state = {
            attendanceData: [],
            studentData: [],
            userData: []
        }

    }

    componentDidMount() {
        let course_id = localStorage.getItem("course_id");
        let response = new CoordenadorService().carregarRelatorio(course_id);

        response.then(res => {
            console.log(res.data)
            res.data[0].subjects.map((disciplina) => {
                if (disciplina.id == this.props.match.params.id) {
                    disciplina.monitors.map((monitor) => {
                        if (this.props.match.params.id_monitor == monitor.id) {
                            this.setState({ attendanceData: monitor.__meta__ });
                            this.setState({ studentData: monitor.student });
                            this.setState({ userData: monitor.student.user });
                            document.getElementsByClassName("relatorio")[0].classList.remove("show-loading")

                            let req_pendente_p = (this.state.attendanceData.pending_requests / this.state.attendanceData.total_requests) * 100;
                            let req_confirmado_p = (this.state.attendanceData.confirmed_requests / this.state.attendanceData.total_requests) * 100;
                            let req_negado_p = (this.state.attendanceData.denied_requests / this.state.attendanceData.total_requests) * 100;
                            document.getElementsByClassName("request")[0].childNodes[0].style.width = req_pendente_p + "%";
                            document.getElementsByClassName("request")[0].childNodes[1].style.width = req_confirmado_p + "%";
                            document.getElementsByClassName("request")[0].childNodes[2].style.width = req_negado_p + "%";
                            let att_pendente_p = (this.state.attendanceData.pending_attendances / this.state.attendanceData.total_attendances) * 100;
                            let att_confirmado_p = (this.state.attendanceData.completed_attendances / this.state.attendanceData.total_attendances) * 100;
                            let att_negado_p = (this.state.attendanceData.canceled_attendances / this.state.attendanceData.total_attendances) * 100;
                            document.getElementsByClassName("attendances")[0].childNodes[0].style.width = att_pendente_p + "%";
                            document.getElementsByClassName("attendances")[0].childNodes[1].style.width = att_confirmado_p + "%";
                            document.getElementsByClassName("attendances")[0].childNodes[2].style.width = att_negado_p + "%";
                        }
                    })
                }
            })
        })

    }

    render() {
        return (
            <div className="relatorio show-loading">
                <div className="title">
                    <p>Relatório de Monitoria</p>
                    <small>{this.state.userData.name}</small>
                    <div className="user-data">
                        <p>Matrícula: <span>{this.state.studentData.registration}</span></p>
                        <p>Cód. Pessoa: <span>{this.state.userData.person_code}</span></p>
                        <p>Telefone: <span>{this.state.studentData.phone}</span></p>
                        <p>E-mail: <span>{this.state.userData.email}</span></p>
                    </div>
                </div>
                <div className="body">
                    <div className="data">
                        <div className="title">
                            <p>Solicitações</p>
                        </div>
                        <div className="content">
                            <p className="pendente color">Pendentes: <span>{this.state.attendanceData.pending_requests}</span></p>
                            <p className="confirmado color">Confirmadas: <span>{this.state.attendanceData.confirmed_requests}</span></p>
                            <p className="negado color">Recusadas: <span>{this.state.attendanceData.denied_requests}</span></p>
                            <p className="total">Total: <span>{this.state.attendanceData.total_requests}</span></p>
                        </div>
                        <div className="graphic request">
                            <div className="pendente"></div>
                            <div className="confirmado"></div>
                            <div className="negado"></div>

                        </div>
                    </div>
                    <div className="data">
                        <div className="title">
                            <p>Atendimentos</p>
                        </div>
                        <div className="content">
                            <p className="pendente color">Pendentes: <span>{this.state.attendanceData.pending_attendances}</span></p>
                            <p className="confirmado color">Concluídos: <span>{this.state.attendanceData.completed_attendances}</span></p>
                            <p className="negado color">Cancelados: <span>{this.state.attendanceData.canceled_attendances}</span></p>
                            <p className="total">Total: <span>{this.state.attendanceData.total_attendances}</span></p>
                        </div>
                        <div className="graphic attendances">
                            <div className="pendente"></div>
                            <div className="confirmado"></div>
                            <div className="negado"></div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="red" onClick={() => window.close()}>Fechar</button>
                </div>
            </div>
        );
    }
}

export default Relatorio;