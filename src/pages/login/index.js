import React, { Component } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import './style.css';

export default class Login extends Component {
    state = {
        profile: null,
        error: null
    };

    login(response) {
        console.log(response);
    }

    logout(response) {
        console.log(response);
    }

    render() {
        return(
            <div>
                <GoogleLogin
                    clientId= '1064973056914-r84p28t5he31kd051kkmafnmp4tvbsa0.apps.googleusercontent.com'
                    buttonText= 'Logar'
                    onSuccess= {this.login}
                    onFailure= {this.login}
                    cookiePolicy= {'single_host_origin'}
                />

                <GoogleLogout
                    clientId= '1064973056914-r84p28t5he31kd051kkmafnmp4tvbsa0.apps.googleusercontent.com'
                    buttonText= 'Deslogar'
                    onLogoutSuccess= {this.logout}
                />
            </div>
        )
    }
}