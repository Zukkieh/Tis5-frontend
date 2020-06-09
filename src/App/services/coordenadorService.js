import axios from 'axios';

export class CoordenadorService {

    async cadastrarDisciplina(nome, turno) {
        return axios.post('https://tis5-backend.herokuapp.com/subject', { name: nome, shift: turno }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } });
    }

    async listarDisciplina(course_id, page, limit) {
        return axios.get('https://tis5-backend.herokuapp.com/course/' + course_id + '/subject?page=' + page + '&limit=' + limit, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async carregarDisciplina(disciplina_id) {
        return axios.get('https://tis5-backend.herokuapp.com/subject/' + disciplina_id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })

    }

    async alterarDisciplina(id, name, shift, active) {
        return axios.patch('https://tis5-backend.herokuapp.com/subject/' + id, { name: name, shift: shift, active: active }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async listarMonitores(disciplina_id) {
        return axios.get('https://tis5-backend.herokuapp.com/subject/' + disciplina_id + '/monitor?page=1&limit=999999', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async listarAlunos(course_id) {
        return axios.get('https://tis5-backend.herokuapp.com/course/' + course_id + '/student?page=1&limit=999999', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async carregarAluno(aluno_id) {
        return axios.get('https://tis5-backend.herokuapp.com/student/' + aluno_id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async cadastrarMonitor(disciplina_id, student_id, workload) {
        return axios.post('https://tis5-backend.herokuapp.com/monitor', { student_id: student_id, subject_id: disciplina_id, workload: workload }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }


    async carregarMonitor(monitor_id) {
        return axios.get('https://tis5-backend.herokuapp.com/monitor/' + monitor_id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async apagarMonitor(monitor_id) {
        return axios.delete('https://tis5-backend.herokuapp.com/monitor/' + monitor_id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }

    async carregarRelatorio(course_id) {
        return axios.get('https://tis5-backend.herokuapp.com/course/' + course_id + "/report", { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    }
}