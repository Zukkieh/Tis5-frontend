import React, { Component } from 'react/'
import { CoordenadorService } from '../../../services/coordenadorService'
class Relatorio extends Component {

    constructor() {
        super();
        this.state = {
            attendanceData: [],
            studentData: [],
            userData: [],
            disciplinaData: [],
            courseData: [],
            coordenadorData: []
        }

    }

    componentDidMount() {
        let response = new CoordenadorService().carregarRelatorio(this.props.match.params.id_monitor);

        response.then(res => {
            console.log(res.data)


            this.setState({ attendanceData: res.data.__meta__ });
            this.setState({ studentData: res.data.student });
            this.setState({ userData: res.data.student.user });
            this.setState({ disciplinaData: res.data.subject });
            this.setState({ courseData: res.data.student.course })
            this.setState({ coordenadorData: res.data.student.course.coordinator.user })
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




        })

    }

    render() {
        return (
            <div className="relatorio show-loading">
                <header className="header">
                    <p>Relatório de Monitoria</p>
                </header>
                <div>
                    <div className="title">
                        <header>
                            <p>Dados do monitor</p>
                        </header>
                        <div className="row">
                            <div className="key">
                                <p>Nome:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.userData.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Matrícula:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.studentData.registration}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Cód. Pessoa:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.userData.person_code}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>E-mail:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.userData.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Telefone:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.studentData.phone}</p>
                            </div>
                        </div>
                        <header>
                            <p>Dados do curso</p>
                        </header>
                        <div className="row">
                            <div className="key">
                                <p>Curso:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.courseData.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Campus:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.courseData.campus}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Disciplina:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.disciplinaData.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="key">
                                <p>Turno:</p>
                            </div>
                            <div className="value">
                                <p>{this.state.disciplinaData.shift}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="key">
                                <p>Coordenador(a):</p>
                            </div>
                            <div className="value">
                                <p>{this.state.coordenadorData.name}</p>
                            </div>
                        </div>

                    </div>
                    <div className="body">
                        <header>
                            <p>Dados da monitoria</p>
                        </header>
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
            </div>
        );
    }
}

export default Relatorio;