import axios from 'axios';

export class AdminService {
    
    async listarCoordenadores() {
        return axios.get('https://tis5-backend.herokuapp.com/coordinator', { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } })
    }
}