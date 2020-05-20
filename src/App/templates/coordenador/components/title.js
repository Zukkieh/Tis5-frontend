import React, { Component } from 'react';
import Logo from '../../components/logo/logo'

class Title extends Component {

    constructor() {
        super();
        let title, name;
        name = localStorage.getItem("name");
        title = localStorage.getItem("course");
        title == '' ? title = 'Sem curso' : title = title;

        this.state = {
            name: name,
            title: title,
        }

    }

    showUserOpcoes() {
        document.getElementById("opcoes").classList.toggle("hide");
    }

    logout() {
        localStorage.clear();
        window.open("/login", "_self")
    }

    render() {
        return (
            <div className="admin_banner">
                <Logo />

                <div className="title">
                    {this.state.title}
                </div>
                <div className="user" onClick={() => this.showUserOpcoes()}>
                    <div>
                        <i className="fa-user" />
                    </div>
                    <div id="adm-op" >
                        <p id="name_coordenador">{this.state.name}</p>
                        <div id="opcoes" className="hide">
                            <div className="logout" onClick={() => this.logout()}>
                                sair
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Title;