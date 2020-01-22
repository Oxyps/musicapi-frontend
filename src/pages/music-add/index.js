import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.css';

export default class MusicAdd extends Component {
    state = {
        title: null,
        seconds: null
    };

    constructor() {
        super();
        this.setTitle = this.setTitle.bind(this)
        this.setSeconds = this.setSeconds.bind(this)
    }

    setTitle(event) {
        this.setState({ title: event.target.value });
    }
    setSeconds(event) {
        this.setState({ seconds: event.target.value });
    }

    addMusic = async () => {
        await api.post('musics/', {title: this.state.title, seconds: this.state.seconds})
            .then( () => {
                toast.success('Cadastro realizado!');
            })
            .catch( error => {
                let message= '';
                if(error.response.status === 400){
                    message= 'Os campos título e segundos de duração são obrigatórios!';
                } else {
                    message= 'Algo inesperado aconteceu, contate o desenvolvedor!';
                }
                toast.error(message);
            })
        ;
    };

    render() {
        return(
            <div>
                <Link to="/musics" className="back-button">Voltar</Link>

                <form className="music-form-add">
                    <div className="title">
                        Título: <input type="text" onChange={this.setTitle} />
                    </div>
                    <div className="seconds">
                        Segundos de duração: <input type="number" onChange={this.setSeconds} />
                    </div>
                </form>

                <div className="music-add">
                    <button onClick={this.addMusic}>Adicionar</button>
                </div>
            </div>
        );
    }
}