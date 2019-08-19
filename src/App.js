import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signin from './component/Login'
import Joinin from './component/Join';
import axios from 'axios';

class App extends Component {

    state = {
        login: {
            email: '',
            password: '',
        },
        join: {
            email: '',
            password: '',
            first: '',
            last: '',
        }
    }

    handleSetLogin = (e) => {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSetJoin = (e) => {
        this.setState({
            ...this.state,
            join: {
                ...this.state.login,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleLogin = () => {
        axios.post('http://13.58.55.98:5000/request/login', {
            email: this.state.login.email,
            pw: this.state.login.password,
        }).then(response => {
            return response.data;
        }).catch(response => { console.log(response)})
    }


    handleJoin = () => {
        axios.post('http://13.58.55.98:5000/request/join', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            pw: this.state.pw,
        })
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={ props =>
                    <Signin {...props} setLogin={this.handleSetLogin} handleLogin={this.handleLogin} />} />
                <Route exact path='/join' component={Joinin} />
            </div>
        );
    }
}

export default App;