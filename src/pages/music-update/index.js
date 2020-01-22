import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

export default class MusicAdd extends Component {
    state = {
        id: null,
        title: null,
        seconds: null
    };

    constructor() {
        super();
        this.setTitle = this.setTitle.bind(this)
        this.setSeconds = this.setSeconds.bind(this)
    };

    setTitle(event) {
        this.setState({ title: event.target.value });
    };
    setSeconds(event) {
        this.setState({ seconds: event.target.value });
    };

    componentDidMount() {
        this.loadMusic(this.props.match.params.id);
    };

    loadMusic = async (id) => {
        const response = await api.get(`/music/${id}`);

        const { title, seconds } = response.data;
        this.setState({ id, title, seconds });
    };

    updateMusic = async () => {
        const toast_options = {
            hideProgressBar: true,
            pauseOnHover: false,
        };

        await api.put(`music/${this.state.id}/`, {
                title: this.state.title,
                seconds: this.state.seconds
            })
            .then( () => {
                toast.success('Alteração realizada!', toast_options);
            })
            .catch( error => {
                let message= '';
                if(error.response.status === 400){
                    message= 'Os campos título e segundos de duração são obrigatórios!';
                } else {
                    message= 'Algo inesperado aconteceu, contate o desenvolvedor!';
                }
                toast.error(message, toast_options);
            })
        ;
    };

    render() {
        return(
            <div>
                <Link to={`/music-detail/${this.state.id}`} className="back-button">Voltar</Link>
                
                <form className="music-form-add">
                    <div className="title">
                        Título:
                        <input type="text" onChange={this.setTitle} defaultValue={this.state.title}/>
                    </div>
                    <div className="seconds">
                        Segundos de duração:
                        <input type="number" onChange={this.setSeconds} defaultValue={this.state.seconds} />
                    </div>
                </form>

                <div className="music-update">
                    <button onClick={this.updateMusic}>Alterar</button>
                </div>
            </div>
        );
    }
}