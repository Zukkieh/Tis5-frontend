import axios from 'axios';

export class AdminService {

    async listarCoordenadores() {
        return axios.get('https://tis5-backend.herokuapp.com/coordinator', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async cadastrarCoordenador(nome, cod_pessoa, email, password) {
        return await axios.post("https://tis5-backend.herokuapp.com/coordinator", { person_code: cod_pessoa, name: nome, email: email, password: password }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async alterarCoordenador(id, nome, password, type) {
        if (password == '') {
            return await axios.patch("https://tis5-backend.herokuapp.com/user/" + id, { name: nome, type: type }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
        }
        return await axios.patch("https://tis5-backend.herokuapp.com/user/" + id, { name: nome, password: password, type: type }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }
    async apagarCoordenador(id) {
        return axios.delete("https://tis5-backend.herokuapp.com/user/" + id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async listarCursos() {
        return axios.get('https://tis5-backend.herokuapp.com/course', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async listarCampus() {
        return axios.get('https://tis5-backend.herokuapp.com/enum/course/campus', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async cadastrarCurso(nome, campus, coordinator_id) {
        return axios.post('https://tis5-backend.herokuapp.com/course', { name: nome, campus: campus, coordinator_id: coordinator_id }, { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }

    async alterarCurso(id, nome, campus, coordinator_id) {
        return axios.patch('https://tis5-backend.herokuapp.com/course/' + id, { name: nome, campus: campus, coordinator_id: coordinator_id }, { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }



}