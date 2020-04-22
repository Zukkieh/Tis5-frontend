import axios from 'axios';

export class AdminService {

    async listarCoordenadores() {
        return axios.get('https://tis5-backend.herokuapp.com/coordinator', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async cadastrarCoordenador(nome, cod_pessoa, email, password) {
        return await axios.post("https://tis5-backend.herokuapp.com/coordinator", { person_code: cod_pessoa, name: nome, email: email, password: password }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async listarCursos() {
        return axios.get('https://tis5-backend.herokuapp.com/course', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }
}