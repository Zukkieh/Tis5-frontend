import React, { Component } from 'react';
import Title from './components/title';
import Asside from './components/asside';
import Edit from './disciplinas/edit'

class Coordenador_disciplinas_edit extends Component {



    componentDidMount() {

        let course = localStorage.getItem("course");
        if (course == '') {
            window.open("conta", "_self")
        }
    }

    render() {
        return (
            <div className="admin">
                <Title />
                <div className="content">
                    <Asside active="item-coordenador-disciplina" />
                    <div className="main">
                        <div className="admin_controls">
                            <Edit id={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coordenador_disciplinas_edit;
