import React, { Component } from 'react';
import Title from './components/title';
import Asside from './components/asside';
import Monitores_edit from './monitores/edit'

class Coordenador_monitores_edit extends Component {




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
                    <Asside />
                    <div className="main">
                        <div className="admin_controls">
                            <Monitores_edit id_disciplina={this.props.match.params.id} id_monitor={this.props.match.params.id_monitor} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coordenador_monitores_edit;
