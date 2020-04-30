import axios from 'axios';

export class CoordenadorService {

    async cadastrarDisciplina(nome, turno) {
        return axios.post('https://tis5-backend.herokuapp.com/subject', { name: nome, shift: turno }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } });
    }

    async listarDisciplina(course_id, page, limit) {
        return axios.get('https://tis5-backend.herokuapp.com/course/' + course_id + '/subject?page=' + page + '&limit=' + limit, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async alterarDisciplina(id, name, shift, active) {
        return axios.patch('https://tis5-backend.herokuapp.com/subject/' + id, { name: name, shift: shift, active: active }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }
}