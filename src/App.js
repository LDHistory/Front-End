import React, { Component } from 'react';
import Signin from './component/Login';
import axios from 'axios';

class App extends Component {
  state = {
    login: {
      id: '',
      pws: '',
    },
  }

  handleGetId = (e) => {
    const {value} = e.target;
    this.setState({
      login : {
        id : value,
        pws : this.state.login.pws
      }
    })
  }

  handleGetPw = (e) => {
    const {value} = e.target;
    this.setState({
      login : {
        id : this.state.login.id,
        pws : value
      }
    })   
  }

  handleLogin = () => {
    axios.post('http://13.58.55.98:5000/request/login', {
      id : this.state.login.id,
      pw : this.state.login.pws,
    }).then(response => {alert(response.data)})
    .catch(response => {alert(response)})
  }

  render() {
    const { login } = this.state;
    const { 
      handleLogin,
      handleGetId, 
      handleGetPw
    } = this;

    return (
      <div>
        <Signin info={login} getId = {handleGetId} getPw = {handleGetPw} login={handleLogin} />
      </div>
    );
  }
}


export default App;