import React, { Component } from 'react';
import axios from 'axios';
class Coordenador_conta extends Component {


    async updatePassword() {
        document.getElementsByClassName("Coordenador_conta")[0].classList.add("show-loading");
        let id = localStorage.getItem("id")
        let user_id = localStorage.getItem("user_id");
        let token = localStorage.getItem("token");
        let password = document.getElementById("newPass").value
        let oldPass = document.getElementById("oldPass").value

        await axios.patch("https://tis5-backend.herokuapp.com/auth/" + user_id, { password: { old: oldPass, new: password } }, { headers: { Authorization: "Bearer " + token } }).then(res => {
            console.log(res.data)
            alert("Senha alterada");
            document.getElementById("newPass").value = "";
            document.getElementById("oldPass").value = "";
            document.getElementsByClassName("Coordenador_conta")[0].classList.remove("show-loading");

        }).catch(err => {
            alert("Não foi possível alterar a senha. " + err.response.data.errors[0].message)
            console.log(err.response)
            document.getElementsByClassName("Coordenador_conta")[0].classList.remove("show-loading");
        })
    }

    render() {

        return (
            <div id="view_conta" className=" hide admin_controls_comp">
                <div>

                    <div className="Coordenador_conta">
                        <div>
                            <h2>Alterar Senha</h2>

                            <div>

                                <label htmlFor="pass">Digite sua senha atual</label>
                                <input type="password" id="oldPass" />
                                <label htmlFor="newPass">Digite sua nova senha</label>
                                <input type="password" id="newPass" />
                                <button onClick={() => this.updatePassword()}>Alterar</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

export default Coordenador_conta;