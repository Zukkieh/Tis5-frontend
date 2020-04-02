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



    async updatePassword(){
        let id = localStorage.getItem("id")
        let token = localStorage.getItem("token");
        let password = document.getElementById("newPass").value

        await axios.patch("https://tis5-backend.herokuapp.com/coordinator/"+id,{password:password}, {headers: { Authorization: "Bearer " +token }}).then(res=>{
            if(res.data.success){
                alert("Senha alterada");
                document.getElementById("newPass").value = ""
            }
        }).catch(err =>{
            console.log(err.data)
        })
    }

    render() {
        
        return (
            <div className="coordenador_controls">
                
                    <h2>Alterar Senha</h2>
                
                <div>
                    <label htmlFor="newPass">Digite sua nova senha</label>
                    <input type="password" id="newPass" />
                    <button onClick={()=>this.updatePassword()}>Alterar</button>
                </div>

            </div>
        );

    }
}

export default Coordenador_controls;