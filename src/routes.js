import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Musics from './pages/musics';
import MusicAdd from './pages/music-add';
import MusicDetail from './pages/music-detail';
import MusicUpdate from './pages/music-update';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* <Route exact path="/" component={Home} /> */}

            <Route path="/login" component={Login}></Route>
            <Route path="/musics" component={Musics} />
            <Route path="/music-add" component={MusicAdd} />
            <Route path="/music-detail/:id" component={MusicDetail} />
            <Route path="/music-update/:id" component={MusicUpdate} />
        </Switch>
    </BrowserRouter>
);

export default Routes;