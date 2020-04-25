import axios from 'axios';

export class AdminService {

    async listarCoordenadores() {
        return axios.get('https://tis5-backend.herokuapp.com/coordinator', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async cadastrarCoordenador(nome, cod_pessoa, email, password) {
        return await axios.post("https://tis5-backend.herokuapp.com/coordinator", { person_code: cod_pessoa, name: nome, email: email, password: password }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async alterarCoordenador(id, nome, cod_pessoa, email, password) {

        return await axios.patch("https://tis5-backend.herokuapp.com/user/" + id, { person_code: cod_pessoa, name: nome, email: email, password: password }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })


    }

    async listarCursos() {
        return axios.get('https://tis5-backend.herokuapp.com/course', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async listarCampus() {
        return axios.get('https://tis5-backend.herokuapp.com/enum/course/campus', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async apagarCoordenador(id) {
        return axios.delete("https://tis5-backend.herokuapp.com/user/" + id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }
}