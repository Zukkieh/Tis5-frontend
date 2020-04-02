import React, { Component, createElement } from 'react';
import axios from 'axios';
import './controls.scss'
class Coordenador_controls extends Component {
    showFormCadastroCoordenador() {
        document.getElementsByClassName('form-cadastro-coordenador')[0].classList.remove('hide');
        document.getElementsByClassName('results')[0].classList.add('hide');
        document.getElementsByClassName('pagination')[0].classList.add('hide');
        document.getElementsByClassName('control')[0].classList.add('hide');
    }

    hideFormCadastroCoordenador() {
        document.getElementsByClassName('form-cadastro-coordenador')[0].classList.add('hide');
        document.getElementsByClassName('results')[0].classList.remove('hide');
        document.getElementsByClassName('pagination')[0].classList.remove('hide');
        document.getElementsByClassName('control')[0].classList.remove('hide');
    }

    pesquisaCoordenador() {

        document.getElementsByClassName('results')[0].classList.add('show-loading');

        setTimeout(function () {
            document.getElementsByClassName('results')[0].classList.remove('show-loading');
        }, 1500)


    }

    async cadastrarCoordenador() {
        let nome_coordenador = document.getElementById("nome_coordenador").value;
        let cod_pessoa_coordenador = document.getElementById("cod_pessoa_coordenador").value;
        let email_coordenador = document.getElementById("email_coordenador").value;
        let password_coordenador = document.getElementById("password_coordenador").value;

        await axios.post("https://tis5-backend.herokuapp.com/coordinator", { person_code: cod_pessoa_coordenador, name: nome_coordenador, email: email_coordenador, password: password_coordenador }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } }).then(res => {
            console.log(res.data)
            console.log(cod_pessoa_coordenador)
            this.hideFormCadastroCoordenador()
            this.showAllCordenadores();
        }).catch(err => {
            console.log(err.response)
        })

    }


    async showAllCordenadores() {
        await axios.get("https://tis5-backend.herokuapp.com/coordinator", { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } }).then(res => {

            let allCoordenadores = res.data;
            console.log(allCoordenadores)
            let div_results = document.getElementsByClassName("results_coordenador")[0];
            for (let i = 0; i < allCoordenadores.length; i++) {
                let resultItem;
                if (i % 2 == 0) {
                    resultItem = `<div class="result_item strip"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                } else {
                    resultItem = `<div class="result_item"><div>` + allCoordenadores[i].name + `</div><div>` + allCoordenadores[i].person_code + `</div></div>`;
                }

                div_results.innerHTML += resultItem
            }

        }).catch(err => {
            console.log(err.response)
        })
    }


    render() {
        this.showAllCordenadores()
        return (
            <div className="coordenador_controls">
                
                    <h2>Alterar Senha</h2>
                
                <div>
                    <label htmlFor="newPass">Digite sua nova senha</label>
                    <input type="password" id="newPass" />
                    <button>Alterar</button>
                </div>

            </div>
        );

    }
}

export default Coordenador_controls;