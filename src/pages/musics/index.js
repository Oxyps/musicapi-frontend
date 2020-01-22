import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './style.css';

export default class Main extends Component {
    state = {
        musics: [],
        total: 0,
        prevPage: null,
        nextPage: null,
        currentPage: 1,
    };

    componentDidMount() {
        this.loadMusics();
    }

    loadMusics = async (path='musics/') => {
        const response = await api.get(path);

        const results = response.data.results;
        const total = response.data.total;
        const pageSize = response.data.page_size;
        const prevPage = response.data.links.prev;
        const nextPage = response.data.links.next;

        let currentPage = path.split('page=', 2)[1]
        if(path === 'musics/') currentPage = 1;
        
        this.setState({ musics: results, total, prevPage, nextPage, pageSize, currentPage});
    };

    prevPage = () => {
        if(this.state.prevPage === null) return;

        this.loadMusics(this.state.prevPage.split('0/', 2)[1]);//pega a segunda string que contem a partir do localhost:8000/
    };

    nextPage = () => {
        if(this.state.nextPage === null) return;

        this.loadMusics(this.state.nextPage.split('0/', 2)[1]);//pega a segunda string que contem a partir do localhost:8000/
    };

    render() {
        const { musics, prevPage, nextPage, currentPage, total, pageSize } = this.state;

        return(
            <div className="music-list-page">
                <h1 className="music-amount">Quantidade de músicas: {this.state.total}</h1>

                <div className="page-actions">
                    <button disabled={prevPage === null} onClick={this.prevPage}>Anterior</button>
                    <span>Page {currentPage} de {Math.ceil(total / pageSize)}</span>
                    <button disabled={nextPage === null} onClick={this.nextPage}>Próxima</button>
                </div>
                
                <div className="music-add">
                    <Link to='/music-add'>Adicionar</Link>
                </div>
                <div className="music-list">
                    {musics.map(music => (
                        <article key={music.id}>
                            <strong>{music.title}</strong>

                            <Link id="detail-link" to={`/music-detail/${music.id}`}>Visualizar</Link>
                            {/* <Link id="update-link" to={`/music-update/${music.id}`}>Alterar</Link> */}
                            {/* <Link id="delete-link" to={`/music-delete/${music.id}`}>Deletar</Link> */}
                        </article>
                    ))}
                </div>
            </div>
        );
    }
}