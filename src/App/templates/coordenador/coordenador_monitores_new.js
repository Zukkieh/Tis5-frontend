import React, { Component } from 'react';
import Title from './components/title';
import Asside from './components/asside';
import Monitores_new from './monitores/new'

class Coordenador_monitores_new extends Component {




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
                            <Monitores_new id={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coordenador_monitores_new;
