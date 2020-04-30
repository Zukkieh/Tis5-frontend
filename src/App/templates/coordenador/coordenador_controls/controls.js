import React, { Component } from 'react';
import axios from 'axios';
import './controls.scss'
class Coordenador_conta extends Component {


    async updatePassword() {
        let id = localStorage.getItem("id")
        let user_id = localStorage.getItem("user_id");
        let token = localStorage.getItem("token");
        let password = document.getElementById("newPass").value
        let oldPass = document.getElementById("oldPass").value

        await axios.patch("https://tis5-backend.herokuapp.com/auth/" + user_id, { password: password }, { headers: { Authorization: "Bearer " + token } }).then(res => {
            if (res.data.success) {
                alert("Senha alterada");
                document.getElementById("newPass").value = ""
            }
        }).catch(err => {
            console.log(err.data)
        })
    }

    render() {

        return (
            <div className="Coordenador_conta">

                <h2>Alterar Senha</h2>

                <div>
                    <label htmlFor="pass">Digite sua senha atual</label>
                    <input type="password" id="oldPass" />
                    <label htmlFor="newPass">Digite sua nova senha</label>
                    <input type="password" id="newPass" />
                    <button onClick={() => this.updatePassword()}>Alterar</button>
                </div>

            </div>
        );

    }
}

export default Coordenador_conta;