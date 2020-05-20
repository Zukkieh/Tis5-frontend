import React, { Component } from 'react';
import Title from './components/title';
import Asside from './components/asside';
import Conta from './coordenador_conta/conta'

class Coordenador_conta extends Component {

    constructor() {
        super();
        this.state = {
            hideItem: "",
        }

        let course = localStorage.getItem("course");

        if (course == "") {
            this.state.hideItem = "item-coordenador-disciplina";
        }
    }


    componentDidMount() {


    }

    render() {
        return (
            <div className="admin">
                <Title />
                <div className="content">
                    <Asside active="item-coordenador-conta" hide={this.state.hideItem} />
                    <div className="main">
                        <div className="admin_controls">
                            <Conta />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coordenador_conta;
