import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Asside extends Component {

    constructor() {
        super();

    }

    componentDidMount() {

        try {

            let active = this.props.active;
            document.getElementsByClassName(active)[0].classList.add("active");
            let hide = this.props.hide

            if (hide != null || hide != undefined) {
                document.getElementsByClassName(hide)[0].classList.add("hide")
            }
        } catch (e) {

        }

    }

    render() {

        return (

            <div className="aside">
                <div className="title">
                    <p>Opções do Coordenador</p>
                </div>
                <Link to="/coordenador/disciplinas" className="item item-coordenador-disciplina">

                    <p>Gerenciar Disciplinas</p>

                </Link>
                <Link to="/coordenador/conta" className="item item-coordenador-conta">

                    <p>Minha Conta</p>

                </Link>


            </div>

        )
    }

}
export default Asside;