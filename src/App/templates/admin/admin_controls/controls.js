import React, { Component } from 'react';
import axios from 'axios';
import './controls.scss';
import { AdminService } from '../../../services/adminService';
import Coordenadores from './coordenadores/coordenadores';
import Cursos from './cursos/cursos'

class admin_controls extends Component {
    admService = new AdminService();




    componentDidMount() {

    }

    render() {

        return (
            <div className="admin_controls">

                <Coordenadores />
                <Cursos />


            </div>
        );

    }
}

export default admin_controls;