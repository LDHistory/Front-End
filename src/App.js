import React, { Component } from 'react';
import axios from 'axios';

import Signin from './component/Login';
import Joinin from './component/Join';





class App extends Component {
  state = {
    mode: 'signin',

    login: {
      email: '',
      pw: '',
    },

    join: {
      first: '',
      last: '',
      email: '',
      pw: '',
    }
  }

  handleGetId = (e) => {
    const {value} = e.target;
    this.setState({
      login : {
        email : value,
        pw : this.state.login.pw
      }
    })
  }

  handleGetPw = (e) => {
    const {value} = e.target;
    this.setState({
      login : {
        email : this.state.login.email,
        pw : value
      }
    })   
  }

  handleLogin = () => {
    axios.post('http://13.58.55.98:5000/request/login', {
      email : this.state.login.email,
      pw : this.state.login.pw,
    }).then(response => {alert(response.data);
    })
    .catch(response => {alert(response)})
  }

  handleChange = () => {
    //모드 바뀐거 rendering 위해...
    const { state } = this.state;

    this.setState({
      ...this.state,
    })
  }


  handleGetJoin = (e) => {
    this.setState({
      ...this.state,
      join : {
        [e.target.name]: e.target.value,
      }
    })

    console.log(this.state);
  }

  render() {
    console.log(this.state.mode);
    const {
      handleLogin,
      handleGetId, 
      handleGetPw,
      handleChange,
      handleGetJoin,
    } = this;


    const signin = (
      <Signin state={this.state} getId = {handleGetId} getPw = {handleGetPw} login={handleLogin} change={handleChange} />
    )

    const joinin = (
      <Joinin state={this.state} get={handleGetJoin} change={handleChange} d="dd"></Joinin>
    )

    return (
      <div>
        { this.state.mode === 'signin'? signin : joinin }
      </div>
    );
  }
}

export default App;