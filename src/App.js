import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { Signin, Signup } from './component/pages'

class App extends Component {

  state = {
    signin: {
      email: '',
      pw: '',
    },
    signup: {
      first: '',
      last: '',
      email: '',
      pw: '',
    }
  }

  //로그인 폼에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetSigninData = (e) => {
    this.setState({
      ...this.state,
      signin: {
        ...this.state.signin,
        [e.target.name]: e.target.value,
      }
    })
    console.log(this.state.signin);
  }

  //로그인 버튼을 눌렀을 때 express 서버로 보낸 data를 db에서 검증
  handleSignin = () => {
    return new Promise((resolve, reject) => {
      axios.post('http://13.58.55.98:5000/request/login', {
        email: this.state.signin.email,
        pw: this.state.signin.pw,
      })
      .then(response => { 
        resolve(response.data);
      })
      .catch(response => { 
        reject(response.data);
      })
    })
  }




  //회원 가입 폼에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetSignupData = (e) => {
    this.setState({
      ...this.state,
      signup: {
        ...this.state.signup,
        [e.target.name]: e.target.value,
      }
    })
    console.log(this.state.signup);
  }

  //회원 가입 버튼을 눌렀을 때 express서버로 data를 전송하는 메서드
  handleSignup = () => {
    return new Promise((resolve, reject) => { //axios 비동기 작업을 Promise then으로 동기적으로 바꿈
      axios.post('http://13.58.55.98:5000/request/join', {
        first: this.state.signup.first,
        last: this.state.signup.last,
        email: this.state.signup.email,
        pw: this.state.signup.pw,
      })
      .then((response) => {
        resolve(response.data);
      })
    })
  }

  render() {
    return (
      <div>
        <Route
          exact path='/'
          render={props => <Signin {...props} setData={this.handleSetSigninData} signin={this.handleSignin} />}
        />

        <Route
          path='/join'
          render={props => <Signup {...props} setData={this.handleSetSignupData} signup={this.handleSignup} />}
        />
      </div>
    );
  }
}

export default App;