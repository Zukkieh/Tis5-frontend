import React, { Component } from 'react';
import { AdminService } from '../../../../services/adminService'
class Cursos extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        const response = new AdminService().listarCursos();
        response.then((r) => {
            this.setState({ courses: r.data })
        })
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
                            <button>Novo curso</button>
                        </div>
                    </div>
                    <div className="results">
                        <div className="result_item_title">
                            <div><strong>Curso</strong></div>
                            <div><strong>Campus</strong></div>
                        </div>
                        {


                            this.state.courses.map((course) => (

                                <div class="result_item">
                                    <div>{course.name}</div>
                                    <div>{course.campus}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <div className="total_results">
                            <p>Exibindo 3 de 3 resultados</p>
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