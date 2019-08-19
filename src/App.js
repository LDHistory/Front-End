import React, { Component } from 'react';
import axios from 'axios';

import Signin from './component/Login';
import Joinin from './component/Join';





class App extends Component {

  state = {
    mode: 'signin',

    first: '',
    last: '',
    email: '',
    pw: '',
  }


  handleGetFirst = (e) => {
    this.setState({
      ...this.state,
      first: e.target.value,
    })
    console.log(this.state);
  }

  handleGetLast = (e) => {
    this.setState({
      ...this.state,
      last: e.target.value,
    })
    console.log(this.state);
  }

  handleGetEmail = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    })
    console.log(this.state);
  }

  handleGetPw = (e) => {
    this.setState({
      ...this.state,
      pw: e.target.value,
    })
    console.log(this.state);
  }


  handleLogin = () => {
    axios.post('http://13.58.55.98:5000/request/login', {
      email : this.state.email,
      pw : this.state.pw,
    }).then(response => {alert(response.data)})
    .catch(response => {alert(response)})
  }


  handleJoin = () => {
    axios.post('http://13.58.55.98:5000/request/join', {
      first: this.state.first,
      last: this.state.last,
      email : this.state.email,
      pw: this.state.pw,
    })
  }


  handleChange = () => {
    //모드 바뀐거 rendering 위해...
    this.setState({
      ...this.state,
    })
  }


  checkin = () => {
    console.log(this.state);
  }


  render() {
    console.log('mode :', this.state.mode);
    const {
      handleGetFirst,
      handleGetLast,
      handleGetEmail, 
      handleGetPw,
      handleLogin,
      handleJoin,
      handleChange,
      checkin,
    } = this;


    const signin = (
      <Signin 
        state={this.state} 
        getEmail={handleGetEmail} 
        getPw={handleGetPw} 
        login={handleLogin} 
        change={handleChange} />
    )

    const joinin = (
      <Joinin 
        state={this.state} 
        getFirst={handleGetFirst} 
        getLast={handleGetLast} 
        getEmail={handleGetEmail} 
        getPw={handleGetPw} 
        joins={handleJoin}
        change={handleChange} 
        chec={checkin}
      />
    )

    const board = (
      <Joinin state={this.state} change={handleChange} />
    )

    return (
      <div>
        { this.state.mode === 'signin'? signin : (this.state.mode === 'signin'? joinin : board) }
      </div>
    );
  }
}

export default App;