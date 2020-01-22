import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';

import './style.css';

export default class MusicDetail extends Component {
    state = {
        id: null,
        title: null,
        seconds: null,
        alert: null
    };

    constructor() {
        super();
        this.confirmDelete = this.confirmDelete.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/music/${id}`);

        const { title, seconds } = response.data;
        this.setState({ id, title, seconds });
    };

    confirmDelete() {
        const alert= (
            <SweetAlert
                warning
                title= 'Deseja mesmo deletar?'
                confirmBtnText= 'Deletar'
                onConfirm= { this.deleteMusic }
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="default"
                showCancel
                showCloseButton
                focusCancelBtn
                cancelBtnText= 'Cancelar'
                onCancel= { () => this.setState({ alert: false }) }
                style= { {
                    boxShadow: '0 0 0 0',
                    WebkitBoxShadow: 'none'
                } }
            >
                Tudo que for deletado não poderá ser restituído.
            </SweetAlert>
        );
        this.setState({ alert });
    }

    async deleteMusic() {
        const response= await api.delete(`/music/${this.state.id}`);
        if(response)
            toast.success('Música deletada com sucesso!');
        else
            toast.warn('Algo de errado aconteceu.. chame o desenvolvedor!');

        setTimeout(() => window.location.href= '/musics', 1800);
    }

    render() {
        return(
            <div>
                { this.state.alert }
                
                <Link to="/musics" className="back-button">Voltar</Link>

                <article className="music-info">
                    <h1>Título: {this.state.title}</h1>
                    <p>Possui {this.state.seconds} segundos de duração.</p>

                    <div className="page-link">
                        <Link to={`/music-update/${this.state.id}`}>Alterar</Link>
                        <button onClick={this.confirmDelete}>Deletar</button>
                    </div>
                </article>
            </div>
        );
    }
}