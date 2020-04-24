import React, { Component } from 'react';
import { AdminService } from '../../../../services/adminService'
class Cursos extends Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            campus: [],
            coordenadores: [],
            course_edit: [],
        }
    }




    novoCurso() {

        this.getCampus()
        this.getCoordenadores()
        this.showFormCadastroCurso();

    }


    showFormCadastroCurso() {
        document.getElementsByClassName('form-cadastro-curso')[0].classList.remove('hide');
        document.getElementsByClassName('results')[1].classList.add('hide');
        document.getElementsByClassName('pagination')[1].classList.add('hide');
        document.getElementsByClassName('control')[1].classList.add('hide');
    }

    hideFormCadastroCurso() {
        document.getElementsByClassName('form-cadastro-curso')[0].classList.add('hide');
        document.getElementsByClassName('results')[1].classList.remove('hide');
        document.getElementsByClassName('pagination')[1].classList.remove('hide');
        document.getElementsByClassName('control')[1].classList.remove('hide');
    }

    getCampus() {
        const response = new AdminService().listarCampus();
        response.then(r => {
            this.setState({ campus: r.data });
        })

    }

    getCoordenadores() {
        const response = new AdminService().listarCoordenadores();
        response.then(r => {
            this.setState({ coordenadores: r.data });
        })
    }

    getNameCoordenator(id) {
        let coordenadores = this.state.coordenadores;
        for (let i = 0; i < coordenadores.length; i++) {
            if (coordenadores[i].id == id) {
                return coordenadores[i].name;
            }
        }
    }

    showEditCourse(course) {
        this.getCampus()
        this.getCoordenadores()
        document.getElementsByClassName('results')[1].classList.add('hide');
        document.getElementsByClassName('pagination')[1].classList.add('hide');
        document.getElementsByClassName('control')[1].classList.add('hide');
        document.getElementsByClassName('edit')[1].classList.remove('hide');
        this.setState({ course_edit: course })
    }

    closeEditCourse() {
        document.getElementsByClassName('results')[1].classList.remove('hide');
        document.getElementsByClassName('pagination')[1].classList.remove('hide');
        document.getElementsByClassName('control')[1].classList.remove('hide');
        document.getElementsByClassName('edit')[1].classList.add('hide');
    }

    componentDidMount() {
        const response = new AdminService().listarCursos();
        response.then((r) => {
            this.setState({ courses: r.data })
        })

        this.getCoordenadores()
    }

    render() {
        return (
            <div id="cursos" className="admin_controls_comp hide">
                <div>
                    <div className="control">
                        <div className="icon fa-search">
                            <input placeholder="Pesquise um curso" />
                        </div>

                        <div className="icon fa-plus div-btn-show-form-cadastro-curso">
                            <button onClick={() => this.novoCurso()}>Novo curso</button>
                        </div>
                    </div>
                    <div className="results">
                        <div className="result_item_title">
                            <div><strong>Curso</strong></div>
                            <div><strong>Campus</strong></div>
                            <div><strong>Coordenador</strong></div>
                        </div>
                        {
                            this.state.courses.map((course) => (

                                <div className="result_item" onClick={() => this.showEditCourse(course)}>
                                    <div>{course.name}</div>
                                    <div>{course.campus}</div>
                                    <div>{course.coordinator_id != "" ? this.getNameCoordenator(course.coordinator_id) : "-"}</div>
                                </div>
                            ))
                        }
                    </div>



                    <div className="hide form form-cadastro-curso">
                        <form>
                            <div className="header">
                                <p>Cadastro de Curso</p>
                            </div>

                            <div className="body">
                                <div className="column">
                                    <label htmlFor="nome_curso">Nome do Curso</label>
                                    <input id="nome_curso" placeholder="Curso" />
                                </div>
                                <div className="column">
                                    <label htmlFor="campus">Campus</label>
                                    <select id="campus">
                                        {
                                            this.state.campus.map((campus) => (
                                                <option>{campus}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="column">
                                    <label htmlFor="coordenador_curso">Coordenador</label>
                                    <select id="coordenador_curso">
                                        <option></option>
                                        {
                                            this.state.coordenadores.map((coordenador) => (
                                                <option value={coordenador.id} >{coordenador.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarCurso()}>Cadastrar</button>



                                <a href="javascript:void(0)" onClick={() => this.hideFormCadastroCurso()} >Voltar</a>
                            </div>

                        </form>
                    </div>


                    <div className="hide edit form edit_course">
                        <form>
                            <div className="header">
                                <p>Editar Curso</p>
                            </div>

                            <div className="body">
                                <div className="column">
                                    <label htmlFor="edit_nome_curso">Nome do Curso</label>
                                    <input id="edit_nome_curso" placeholder="Curso" defaultValue={this.state.course_edit.name} />
                                </div>
                                <div className="column">
                                    <label htmlFor="edit_campus">Campus</label>
                                    <select id="edit_campus">
                                        <option>{this.state.course_edit.campus}</option>
                                        {
                                            this.state.campus.map((campus) => {
                                                if (campus.name != this.state.course_edit.campus) {
                                                    return campus.name;
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="column">
                                    <label htmlFor="edit_coordenador_curso">Coordenador</label>
                                    <select id="edit_coordenador_curso">
                                        <option value={this.state.course_edit.coordinator_id}>{this.getNameCoordenator(this.state.course_edit.coordinator_id)}</option>
                                        {
                                            this.state.coordenadores.map((coordenador) => {
                                                if (coordenador.id != this.state.course_edit.coordinator_id) {
                                                    return <option value={coordenador.id} >{coordenador.name}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="cadastrar" type="button" onClick={() => this.cadastrarCurso()}>Alterar dados</button>
                                <button className="cancelar" type="button" onClick={() => this.cadastrarCurso()}>Apagar Curso</button>

                                <a href="javascript:void(0)" onClick={() => this.closeEditCourse()} >Voltar</a>
                            </div>

                        </form>
                    </div>

                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo {this.state.courses.length} resultados</p>
                        </div>
                        <div className="page_select">

                        </div>
                        <div className="nothing">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Cursos;